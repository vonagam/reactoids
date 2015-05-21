mixin =

  componentDidMount: ->

    for attribute in [ 'class', 'props' ]
    
      @getDOMNode().parentNode.removeAttribute 'data-react-' + attribute

    return


React.mixins.add 'ujs_cleaner', mixin
