CacheMixin = Mixin.create {

  name: 'CacheMixin'

  mixin: ->=

    getInitialMembers: ->=

      '_cache': undefined

    ##

    componentWillUpdate: ( nextProps, nextState, nextContext )->

      return if _.isEmpty @_cache

      next = { props: nextProps, state: nextState, context: nextContext }

      _.each @_cache, _.bind ( cache, key )->

        if _.some cache.depend, _.bind ( ( key )->= ! _.isEqual _.get( this, key ), _.get( next, key ) ), this

          delete cache[ key ]

        ##

      , this

    ##

    cache: ( key, options )->=

      @_cache ||= {}

      cache = @_cache[ key ]

      return cache.value if cache

      if options.getter

        value = options.getter.apply this

      else

        value = options.value

      ##

      if _.isFunction( value ) && options.bind != false

        value = _.bind value, this

      ##

      cache = {

        value: value

        depend: options.depend

      }

      @_cache[ key ] = cache

      return cache.value

    ##

  ##

}


module.exports = CacheMixin
