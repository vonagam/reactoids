mixin =

  # Array

  append: require './array/append'

  insert: require './array/insert'

  prepend: require './array/prepend'

  # Collection

  count: require './collection/count'

  countWhere: require './collection/countWhere'

  none: require './collection/none'

  # Function

  bindary: require './function/bindary'

  partialary: require './function/partialary'

  queue: require './function/queue'

  # Lang

  isEqualPick: require './lang/isEqualPick'

  toFlattenedPlainObject: require './lang/toFlattenedPlainObject'

  toInflatedPlainObject: require './lang/toInflatedPlainObject'

  # Math

  avg: require './math/avg'

  clamp: require './math/clamp'

  # Object

  falseyKeys: require './object/falseyKeys'

  truthyKeys: require './object/truthyKeys'

  # Utility

  eacho: require './utility/eacho'

  funced: require './utility/funced'

  pass: require './utility/pass'

  wrapInArray: require './utility/wrapInArray'


module.exports = mixin
