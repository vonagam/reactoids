gulp = require 'gulp'

_ = require 'lodash'

$ = require( 'gulp-load-plugins' )()

path = require 'path'

pipe = require './pipe'


AUTO_REQUIRES = [

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
  }
  {
    module: 'pixi.js'
    variable: 'PIXI'
    includes: /^renderers\/pixi/
  }
  {
    module: 'd3'
    variable: 'd3'
    includes: /^wrappers\/d3/
  }
  {
    module: 'various/Mixin'
    variable: 'Mixin'
    excludes: /^various\/Mixin/
  }
  {
    module: 'mixins/Component'
    variable: 'ComponentMixin'
    includes: /^components\//
    check: /ComponentMixin/
  }

]

_.each AUTO_REQUIRES, ( autoRequire )->

  used = RegExp "\\b#{ autoRequire.variable }[\\.\\[\\(]"

  autoRequire.type = if /\//.test autoRequire.module then 'Source' else 'Dependency'

  autoRequire.isNeeded = ( content, path )->=

    return false if @excludes && @excludes.test path

    return false if @includes && ! @includes.test path

    return false if /^(\.\.\/tests|extend)/.test path

    return true if @check && @check.test content

    return used.test content


sourcesDirectoryPath = path.resolve '../sources'


build = ( src, options = {} )->=

  pipe [

    gulp.src src, base: options.base

    $.plumber errorHandler: options.plumber if options.plumber

    $.insert.transform ( content, file )->=

      filePath = path.relative sourcesDirectoryPath, file.path

      sourcesPath = path.relative path.dirname( file.path ), sourcesDirectoryPath

      _.each AUTO_REQUIRES, ( autoRequire )->

        if autoRequire.isNeeded content, filePath

          content = "#{ autoRequire.variable } = require#{ autoRequire.type } '#{ autoRequire.module }';" + content

      content = content.replace /requireSubject\(\)/g, 'require("./index")'

      content = content.replace /requireDependency\s'([^']+)'/g, "requireSource('dependencies')['$1']"

      content = content.replace /requireSource(\(|\s)'/g, "require$1'#{ sourcesPath }/"

      content = '"use strict";' + content

      content

    $.sourcemaps.init() if options.sourcemaps

    $.coffeeReactVoid bare: true

    $.sourcemaps.write() if options.sourcemaps

    gulp.dest options.dest

  ]


module.exports = build
