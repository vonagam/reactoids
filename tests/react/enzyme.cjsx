_ = require 'lodash'

React = require 'react'

enzyme = require 'enzyme'


getClassNames = require './contexts/getClassNames'

getStrings = require './contexts/getStrings'


contextTypes = {

  getClassNames: React.PropTypes.func

  getStrings: React.PropTypes.func

}

context = {

  getClassNames: getClassNames

  getStrings: getStrings

}


ContextWrapper = React.createClass {

  childContextTypes: contextTypes

  getChildContext: _.constant context

  render: ->= @props.children

}


global.shallow = ( node, options )->=

  options = _.defaultsDeep {}, options, context: context


  enzyme.shallow node, options

##

global.mount = ( node, options )->=

  options = _.defaultsDeep {}, options, context: context, childContextTypes: contextTypes


  enzyme.mount node, options

##

global.render = ( node )->=

  enzyme.render( <ContextWrapper>{ node }</ContextWrapper> ).children().first()

##
