Mixer =


  inject: (->=

    publicMethod = ( method )->=

      ->=

        args = [ this ]

        args.push arg for arg in arguments

        method.apply null, args    

    ( target, source, keys )->=

      _.transform _.pick( source, keys ), ( target, value, key )->

        target[ key ] = 

          if _.isFunction value

            publicMethod value

          else

            value

      , target

  )()


  mixin: (->=

    REACT_METHODS = [

      'propTypes'
      'getDefaultProps'
      'getInitialState'
      'componentWillMount'
      'componentDidMount'
      'componentWillReceiveProps'
      'shouldComponentUpdate'
      'componentWillUpdate'
      'componentDidUpdate'
      'componentWillUnmount'

    ]

    ( mixin, publics = [] )->=

      publics = publics.concat REACT_METHODS

      Mixer.inject {}, mixin, publics

  )()


module.exports = Mixer
