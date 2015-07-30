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

  bindary: ( func, thisArg, partials... )->

    ->

      func.apply thisArg, partials

  partialary: ( func, partials... )->

    ->

      func.apply undefined, partials

  queue: ->

    funcs = _.filter arguments, _.isFunction

    ->

      for func in funcs

        func.apply undefined, arguments

      return
  
  # Math

  avg: ( collection, iteratee, thisArg )->

    _.sum( collection, iteratee, thisArg ) / _.size( collection )

  clamp: ( value, min, max )->

    return max if value > max
    return min if value < min
    return value

  # Object

  truthyKeys: ( object )->

    result = []

    _.forOwn object, ( value, key )->

      result.push key if value

      return

    result

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
