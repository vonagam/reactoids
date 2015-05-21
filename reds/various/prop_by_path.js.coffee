$define ->
  

  get = ( object, path )->

    return object unless path && path.length > 0

    path = path.split '.' if typeof path == 'string'

    for key in path

      return undefined unless object instanceof Object

      object = object[ key ]

    return object


  set = ( object, path, value )->

    throw new Error 'invalid path for setting' unless path && path.length > 0

    path = path.split '.' if typeof path == 'string'

    if path.length > 1

      for key in path.slice 0, -1

        object[ key ] ?= {}

        object = object[ key ]

    object[ path[ path.length - 1 ] ] = value

    return


  flatten = ( object, isValue, target, name )->

    if isValue object

      target[ name ] = object

    else if _.isObject object

      for key, value of object

        key = name + '.' + key if name

        flatten value, isValue, target, key

    return


  isValueDef = ( value )-> typeof value != 'object' || value == null || value instanceof Date


  flattened = ( object, isValue = isValueDef )->

    result = {}

    flatten object, isValue, result

    result
    

  inflated = ( object )->

    result = {}

    set object, path, value for path, value of object

    result


  get: get
  set: set
  flattened: flattened
  inflated: inflated
