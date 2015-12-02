toFlattenedPlainObject = ( _ )->=

  ( source, isDeep = _.isPlainObject, accumulator = {}, path = '' )->=

    _.transform source, ( accumulator, value, key )->

      key = "#{ path }.#{ key }" if path

      if isDeep value

        _.toFlattenedPlainObject value, isDeep, accumulator, key

      else

        accumulator[ key ] = value

    , accumulator


module.exports = toFlattenedPlainObject
