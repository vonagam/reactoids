mixin =

  componentDidMount: ->

    for attribute in [ 'class', 'props' ]
    
      React.findDOMNode( this ).parentNode.removeAttribute 'data-react-' + attribute

    return


ReactMixinManager.add 'ujs_cleaned', mixin
