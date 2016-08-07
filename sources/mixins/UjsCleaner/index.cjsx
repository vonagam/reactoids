mixin =

  Mixin.createPlain

    componentDidMount: ->

      node = ReactDOM.findDOMNode this

      _.each [ 'class', 'props' ], ( attr )->

        node.parentNode.removeAttribute "data-react-#{ attr }"

      ##

    ##

  ##

##


module.exports = mixin
