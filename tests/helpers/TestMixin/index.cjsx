_ = require 'lodash'
React = require 'react'


TestMixin =

  createMixinClass: ( mixin, additionals )->=

    options = _.clone( additionals ) || {}

    options.mixins ||= []

    options.mixins.unshift mixin

    options.render ||= ->= <div>{ @props.children }</div>

    React.createClass options


module.exports = TestMixin
