propByPath =


  flattened: (->

    flatten = ( object, isValue, target, name )->

      if isValue object

        target[ name ] = object

      else if _.isObject object

        _.each object, ( value, key )->

          path = if name then name + '.' + key else key

          flatten value, isValue, target, path

          return

      return

    ( object, isValue = _.isPlainObject )->

      result = {}

      flatten object, isValue, result

      result

  )()
    

  inflated: ( object )->

    _.transform object, ( result, value, path )->

      _.set result, path, value

      return

    , {}


§export propByPath
