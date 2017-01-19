# mixins

BaseKeyMixin = requireSource 'mixins/BaseKey'


BaseStorageMixin = Mixin.create {

  name: 'BaseStorageMixin'

  args: {

    'name': React.PropTypes.string

    'get': React.PropTypes.func # ( that, props, state )->= value

    'set': React.PropTypes.func # ( that, value, callback )->

  }

  defaults: {

    'name': 'store'

  }

  mixins: [

    BaseKeyMixin

  ]

  mixin: ( ARGS )->=

    state = _.camelCase ARGS.name

    method = _.pascalCase ARGS.name


    BaseKeyArgs = {

      name: ARGS.name

      get: ARGS.get

      set: ( that, value, callback )->

        ARGS.set that, value, ->

          that[ "sync#{ method }" ] callback

        ##

      ##

    }


    mixins: [

      BaseKeyMixin BaseKeyArgs

    ]

    getInitialState: ->=

      "#{ state }": ARGS.get that

    ##

    "get#{ method }": ->=

      @[ "get#{ method }Key" ] undefined

    ##

    "set#{ method }": ( value, callback )->

      @[ "set#{ method }Key" ] undefined, value, callback

    ##

    "sync#{ method }": ( callback )->

      @setState "#{ state }": @[ "get#{ method }" ](), callback

    ##

  ##

}


module.exports = BaseStorageMixin
