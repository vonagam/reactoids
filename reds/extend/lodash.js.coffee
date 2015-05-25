_.mixin
  
  append: ( array, values )->

    Array.prototype.push.apply array, values

    return array

  prepend: ( array, values )->

    Array.prototype.unshift.apply array, values

    return array

  pass: ( func, args, thisArg )->

    return func.apply thisArg, args if func

  funced: ( value )->

    if _.isFunction value

      args = _.slice arguments, 1 if arguments.length > 1

      return value.apply undefined, args

    else

      return value

  queue: ->

    args = arguments

    funcs = undefined

    ->

      funcs ||= _.filter _.flattenDeep( _.toArray args ), _.isFunction

      for func in funcs

        func.apply undefined, arguments

      return

  truthyKeys: ( object )->

    result = []

    _.forOwn object, ( value, key )->

      result.push key if value

      return

    result

