_ = require 'lodash'

addLodash = require './addLodash'


autoRequires = [

  {
    module: 'react'
    variable: 'React'
    check: /<\w/
  }
  {
    module: 'react-dom'
    variable: 'ReactDOM'
  }
  {
    module: 'lodash'
    variable: '_'
    add: addLodash
  }
  {
    module: 'd3'
    variable: 'd3'
    includes: /^wrappers\/d3/
  }
  {
    module: 'pixi.js'
    variable: 'PIXI'
    includes: /^wrappers\/pixi/
  }
  {
    module: 'various/Mixin'
    variable: 'Mixin'
    excludes: /^various\/Mixin/
  }
  {
    module: 'mixins/Component'
    variable: 'ComponentMixin'
    includes: /\bcomponents\b/
  }
  {
    module: 'mixins/Input'
    variable: 'InputMixin'
    includes: /\binputs\b/
  }
  {
    module: 'mixins/Focus'
    variable: 'FocusMixin'
    includes: /\binputs\b/
  }
  {
    module: 'mixins/Focus/pass'
    variable: 'FocusPassMixin'
    includes: /\binputs\b/
  }

]


_.each autoRequires, ( autoRequire )->

  used = RegExp "\\b#{ autoRequire.variable }\\b"

  autoRequire.type ||= if /\//.test autoRequire.module then 'Source' else 'Dependency'

  autoRequire.isNeeded ||= ( content, path )->=

    return false if /^(\.\.\/tests)|spec\.\w+$/.test path

    return false if @excludes && @excludes.test path

    return false if @includes && ! @includes.test path

    return true if @check && @check.test content

    return used.test content

  ##

  autoRequire.add ||= ( content, path )->=

    "#{ @variable } = require#{ @type } '#{ @module }'\n\n" + content

  ##

##


addAutoRequires = ( content, path )->=

  _.each autoRequires, ( autoRequire )->

    content = autoRequire.add content, path if autoRequire.isNeeded content, path

  ##

  content

##


module.exports = addAutoRequires
