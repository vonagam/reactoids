findDOM = require '../various/findDOM'


mixin =

  componentDidMount: ->

    node = findDOM this

    _.each [ 'class', 'props' ], ( attr )->
    
      node.parentNode.removeAttribute "data-react-#{ attr }"
      
      return

    return


module.exports = mixin
