Mixin = requireSource 'various/Mixin'


mixin = 

  Mixin.createPlain

    getInitialMembers: ->=

      _cache: undefined

    cache: ( key, dependencies, getter )->=

      @_cache ||= {}

      cache = @_cache[ key ]

      return cache.value if cache

      cache =

        dependencies: dependencies
        value: getter.apply this

      @_cache[ key ] = cache

      return cache.value

    componentWillUpdate: ( nextProps, nextState, nextContext )->

      return unless @_cache

      next = props: nextProps, state: nextState, context: nextContext

      _.each @_cache, ( cache, key )->

        if _.any cache.dependencies, ( ( key )->= ! _.isEqual _.get( this, key ), _.get( next, key ) ), this

          delete cache[ key ]

      , this


module.exports = mixin
