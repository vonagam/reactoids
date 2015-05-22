mixin =

  componentDidMount: ->

    for attribute in [ 'class', 'props' ]
    
      @getDOMNode().parentNode.removeAttribute 'data-react-' + attribute

    return


ReactMixinManager.add 'ujs_cleaner', mixin
