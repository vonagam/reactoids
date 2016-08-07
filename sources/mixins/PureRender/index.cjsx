customizer = ( a, b )->=

  return true if a == b

  if _.isFunction( a ) && _.isFunction( b )

    if a._args && b._args && a._method == b._method

      return _.isEqualWith a._args, b._args, customizer

    ##

    return false

  ##

  return undefined

##


mixin =

  shouldComponentUpdate: ( nextProps, nextState, nextContext )->=

    ! _.isEqualWith( @props, nextProps, customizer ) ||
    ! _.isEqualWith( @state, nextState, customizer )

  ##

##


_.each [

  'bind' # _.bind
  'partial' # _.partial
  'ary' # _.ary
  'queue' # _.queue

], ( method )->

  mixin[ "_#{ method }" ] = ->=

    result = _[ method ].apply _, arguments

    result._method = _[ method ]

    result._args = arguments

    result

  ##

##


__queue = mixin._queue

mixin._queue = ->=

  funcs = _.filter arguments, _.isFunction

  return funcs[ 0 ] if funcs.length < 2

  __queue.apply null, funcs

##


mixin = Mixin.createPlain mixin


module.exports = mixin
