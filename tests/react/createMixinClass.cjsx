_ = require 'lodash'

React = require 'react'


createMixinClass = ( mixin, additionals )->=

  options = _.defaults {}, additionals, {

    mixins: []

    render: ->= <div>{ @props.children }</div>

  }


  options.mixins.unshift mixin


  React.createClass options

##


module.exports = createMixinClass
