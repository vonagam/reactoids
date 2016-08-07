mixin = Mixin.createArged {

  args: {

    'scripts': React.PropTypes.array

    'check': React.PropTypes.func # ( that )->= truthy if already injected

    'decorateScript': React.PropTypes.func # ( script )->

    'callback': React.PropTypes.func # ( that )->

  }

  defaults: {

    'check': _.noop

    'decorateScript': _.noop

    'callback': _.noop

  }

  mixin: ( ARGS )->=

    componentDidMount: ->

      return _.funced ARGS.callback, this if _.funced ARGS.check, this


      head = document.querySelector 'head'

      count = ARGS.scripts.length

      onLoad = _.bind ->

        count--

        _.funced ARGS.callback, this if count == 0

      , this


      _.each ARGS.scripts, ( scriptSrc )->

        return onLoad() if document.querySelector "script[src=\"#{ scriptSrc }\"]"


        script = document.createElement 'script'

        script.src = scriptSrc

        script.onload = onLoad


        ARGS.decorateScript script


        head.appendChild script

      ##

    ##

  ##

}


module.exports = mixin
