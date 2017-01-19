UjsCleanerMixin = Mixin.create {

  name: 'UjsCleanerMixin'

  mixin: _.once ->=

    componentDidMount: ->

      node = ReactDOM.findDOMNode this

      parent = node.parentNode

      _.each [ 'class', 'props' ], ( attr )->

        parent.removeAttribute "data-react-#{ attr }"

      ##

    ##

  ##

}


module.exports = UjsCleanerMixin
