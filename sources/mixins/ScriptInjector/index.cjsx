ScriptInjectorMixin = Mixin.create {

  name: 'ScriptInjectorMixin'

  args: {

    'scripts': React.PropTypes.funced React.PropTypes.array # ( that )->=

    'check': React.PropTypes.func # ( that )->= truthy if already injected

    'decorateScript': React.PropTypes.func # ( that, script )->

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


      scripts = _.funced ARGS.scripts, this


      head = document.querySelector 'head'

      count = scripts.length

      onLoad = _.bind ->

        count--

        _.funced ARGS.callback, this if count == 0

      , this


      _.each scripts, _.bind ( scriptSrc )->

        return onLoad() if document.querySelector "script[src=\"#{ scriptSrc }\"]"


        script = document.createElement 'script'

        script.src = scriptSrc

        script.onload = onLoad


        ARGS.decorateScript this, script


        head.appendChild script

      , this

    ##

  ##

}


module.exports = ScriptInjectorMixin
