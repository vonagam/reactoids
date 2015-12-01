_ = require 'lodash'
React = require 'react'

TestReact = require '../../TestReact'

getClassNames = require '../contexts/getClassNames'
getStrings = require '../contexts/getStrings'


runShallowTest = ( Component, props, options, test )->

  if arguments.length == 3

    test = options

    options = {}

  context = _.defaults {}, options.context, {

    getClassNames: getClassNames
    getStrings: getStrings

  }

  result = TestReact.renderShallow <Component {... props } />, context

  test result.props, result.type


module.exports = runShallowTest
