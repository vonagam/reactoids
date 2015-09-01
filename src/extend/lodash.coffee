_.mixin

  # Array
  
  append: ( array, values )->

    Array.prototype.push.apply array, values

    return array

  prepend: ( array, values )->

    Array.prototype.unshift.apply array, values

    return array

  insert: ( array, index, values )->

    Array.prototype.splice.apply array, [ index, 0 ].concat values

    return array

  # Collection

  none: _.negate _.any

  # Function

  bindary: ->

    _.bind.apply _, _.flatten arguments

  partialary: ->

    _.partial.apply _, _.flatten arguments

  queue: ->

    funcs = _.filter arguments, _.isFunction

    ->

      for func in funcs

        func.apply undefined, arguments

      return

  # Lang

  toFlattenedPlainObject: ( source, isDeep = _.isPlainObject, target = {}, path = '' )->

    _.transform source, ( target, value, key )->

      key = "#{ path }.#{ key }" if path

      if isDeep value

        _.toFlattenedPlainObject value, isDeep, target, key

      else

        target[ key ] = value

      return

    , target

  toInflatedPlainObject: ( source )->

    _.transform source, ( result, value, path )->

      _.set result, path, value

      return

    , {}

  isEqualPick: ( value, other, keys, customizer, thisArg )->

    return true if value == other
    
    _.isEqual _.pick( value, keys ), _.pick( other, keys ), customizer, thisArg
  
  # Math

  avg: ( collection, iteratee, thisArg )->

    _.sum( collection, iteratee, thisArg ) / _.size( collection )

  clamp: ( value, min, max )->

    return max if value > max
    return min if value < min
    return value

  # Object

  truthyKeys: ( object )->

    _.keys _.pick object, _.identity

  falseyKeys: ( object )->

    _.keys _.omit object, _.identity

  # Utility

  pass: ( func, args, thisArg )->

    return func.apply thisArg, args if func

  funced: ( value )->

    if _.isFunction value

      args = _.slice arguments, 1 if arguments.length > 1

      return value.apply undefined, args

    else

      return value

  wrapInArray: ( value )->

    if _.isArray value then value else [ value ]

  eacho: ( value, func )->

    if _.isArray value

      _.each value, func

    else

      func value

    return
