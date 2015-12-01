Mixin = requireSource 'various/Mixin'

findDOM = requireSource 'various/findDOM'


mixin =

  Mixin.createPlain

    componentDidMount: ->

      node = findDOM this

      _.each [ 'class', 'props' ], ( attr )->
      
        node.parentNode.removeAttribute "data-react-#{ attr }"


module.exports = mixin
