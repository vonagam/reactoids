U = require 'react/lib/ReactTestUtils'
ReactDOM = require 'react-dom'
$ = require 'jquery'


TestReact =

  'render': U.renderIntoDocument

  'where': U.findAllInRenderedTree
  'whereClass': U.scryRenderedDOMComponentsWithClass
  'findClass': U.findRenderedDOMComponentWithClass
  'whereTag': U.scryRenderedDOMComponentsWithTag
  'findTag': U.findRenderedDOMComponentWithTag
  'whereType': U.scryRenderedComponentsWithType
  'findType': U.findRenderedComponentWithType

  'do': U.Simulate

  'isElement': U.isElement
  'isElementOfType': U.isElementOfType
  'isDOMComponent': U.isDOMComponent
  'isDOMComponentElement': U.isDOMComponentElement
  'isCompositeComponent': U.isCompositeComponent
  'isCompositeComponentWithType': U.isCompositeComponentWithType
  'isCompositeComponentElement': U.isCompositeComponentElement
  'isCompositeComponentElementWithType': U.isCompositeComponentElementWithType

  'rerender': ( oldInstance, newInstance )->=

    div = ReactDOM.findDOMNode oldInstance

    div = div.parentNode

    ReactDOM.render newInstance, div

  ##

  'renderShallow': ( element, context )->=

    renderer = U.createRenderer()

    renderer.render element, context

    renderer.getRenderOutput()

  ##

  'unmount': ( component )->

    ReactDOM.unmountComponentAtNode ReactDOM.findDOMNode( component ).parentNode

  ##

  'findDOM': ( component )->=

    ReactDOM.findDOMNode component

  ##

  '$': ( component )->=

    $ ReactDOM.findDOMNode component

  ##

##


module.exports = TestReact
