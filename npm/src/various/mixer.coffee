Mixer =


  inject: (->

    publicMethod = ( method )->

      ->

        args = [ this ]

        args.push arg for arg in arguments

        method.apply null, args    

    ( target, source, keys )->

      _.each source, ( value, key )->

        return unless _.include keys, key

        target[ key ] = 

          if _.isFunction value

            publicMethod value

          else

            value

        return

      target

  )()


  mixin: (->

    REACT_METHODS = [

      'getInitialState'
      'getDefaultProps'
      'propTypes'
      'componentWillMount'
      'componentDidMount'
      'componentWillReceiveProps'
      'shouldComponentUpdate'
      'componentWillUpdate'
      'componentDidUpdate'
      'componentWillUnmount'

    ]

    ( mixin, publics = [] )->

      publics = publics.concat REACT_METHODS

      Mixer.inject {}, mixin, publics

  )()


§export Mixer
