Mixin = requireSource 'various/Mixin'


mixin = 

  Mixin.createPlain

    getInitialMembers: ->=

      _cache: undefined

    cache: ( key, options )->=

      @_cache ||= {}

      cache = @_cache[ key ]

      return cache.value if cache

      if options.getter

        value = options.getter.apply this

      else

        value = options.value

      if _.isFunction value

        value = _.bind value, this

      cache = {

        value: value
        depend: options.depend

      }

      @_cache[ key ] = cache

      return cache.value

    componentWillUpdate: ( nextProps, nextState, nextContext )->

      return if _.isEmpty @_cache

      next = props: nextProps, state: nextState, context: nextContext

      _.each @_cache, ( cache, key )->

        if _.any cache.depend, ( ( key )->= ! _.isEqual _.get( this, key ), _.get( next, key ) ), this

          delete cache[ key ]

      , this


module.exports = mixin
