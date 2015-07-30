customizer = ( a, b )->

  return true if a == b

  if _.isFunction( a ) && _.isFunction( b )

    if a._args && b._args && ( a._method == b._method )

      return _.isEqual a._args, b._args, customizer

    return false

  return


mixin =

  shouldComponentUpdate: ( next_props, next_state )->

    ! _.isEqual( @props, next_props, customizer ) || ! _.isEqual( @state, next_state, customizer )


lodash_methods = [ 

  'bind'
  'partial'
  'ary'
  'bindary'
  'partialary'
  'queue'

]

_.each lodash_methods, ( method )->

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


ReactMixinManager.add 'pure_render', mixin
