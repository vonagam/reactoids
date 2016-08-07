_ = require 'lodash'

React = require 'react'


createMixinClass = ( mixin, additionals )->=

  options = _.clone( additionals ) || {}


  options.mixins ||= []

  options.mixins.unshift mixin


  options.render ||= ->= <div>{ @props.children }</div>


  React.createClass options

##


module.exports = createMixinClass
