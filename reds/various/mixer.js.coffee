$define ->


  reacts = [

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


  publicMethod = ( method )->

    ->

      args = [ this ]

      args.push arg for arg in arguments

      return method.apply null, args


  inject = ( target, source, keys )->

    _.each source, ( value, key )->

      return unless _.include keys, key

      if _.isFunction value

        target[ key ] = publicMethod value

      else

        target[ key ] = value

      return

    target


  mixin = ( mixin, publics = [] )->

    publics = publics.concat reacts

    inject {}, mixin, publics


  inject: inject
  mixin: mixin
