customizer = ( a, b )->

  return true if a == b

  if _.isFunction( a ) && _.isFunction( b )

    if a._args && b._args && a._method == b._method

      return _.isEqual a._args, b._args, customizer

    return false

  return


mixin =

  shouldComponentUpdate: ( nextProps, nextState, nextContext )->

    ! _.isEqual( @props, nextProps, customizer ) || 
    ! _.isEqual( @state, nextState, customizer ) ||
    ! _.isEqual( @context, nextContext, customizer )


methods = [ 

  'bind'
  'partial'
  'ary'
  'bindary'
  'partialary'
  'queue'

]

_.each methods, ( method )->

  mixin[ "_#{ method }" ] = ->

    result = _[ method ].apply _, arguments

    result._method = method

    result._args = arguments

    result

  return


__queue = mixin._queue

mixin._queue = ->

  funcs = _.filter arguments, _.isFunction

  return funcs[ 0 ] if funcs.length < 2

  return __queue.apply null, funcs


module.exports = mixin
