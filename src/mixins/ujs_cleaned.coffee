findDOM = §require 'various/find_dom'


mixin =

  componentDidMount: ->

    for attribute in [ 'class', 'props' ]
    
      findDOM( this ).parentNode.removeAttribute 'data-react-' + attribute

    return


ReactMixinManager.add 'ujs_cleaned', mixin
