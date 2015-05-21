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


  mixin: ( mixin, publics = [] )->

    result = {}

    publics = publics.concat reacts

    for key, value of mixin

      continue unless _.includes publics, key

      if typeof value == 'function'

        result[ key ] = publicMethod value

      else

        result[ key ] = value

    result
