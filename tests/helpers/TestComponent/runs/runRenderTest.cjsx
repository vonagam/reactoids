_ = require 'lodash'
React = require 'react'
ReactDOM = require 'react-dom'

TestReact = require '../../TestReact'

getClassNames = require '../contexts/getClassNames'
getStrings = require '../contexts/getStrings'


ContextWrapper = React.createClass

  childContextTypes:

    getClassNames: React.PropTypes.func
    getStrings: React.PropTypes.func

  getChildContext: _.once ->=

    # TODO: check how will adding here prop for context affect test perfomance

    getClassNames: getClassNames
    getStrings: getStrings

  render: ->=

    Component = @props.Component

    props = _.clone @props.props

    props.ref = 'component'

    React.createElement Component, props


runRenderTest = ( Component, props, options, test )->

  if arguments.length == 3

    test = options

    options = {}

  wrapper = TestReact.render <ContextWrapper Component={ Component } props={ props } />

  component = wrapper.refs.component

  rerender = ( props )->

    TestReact.rerender wrapper, <ContextWrapper Component={ Component } props={ props } />

  try

    test component, rerender

  finally

    TestReact.unmount wrapper


module.exports = runRenderTest
