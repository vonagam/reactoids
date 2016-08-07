_ = require 'lodash'


_.mixin {

  # collection

  count: require './count'

  none: require './none'


  # function

  queue: require './queue'


  # lang

  isEqualPick: require './isEqualPick'

  isEqualPickWith: require './isEqualPickWith'

  isExist: require './isExist'


  # object

  falseyKeys: require './falseyKeys'

  truthyKeys: require './truthyKeys'


  # string

  pascalCase: require './pascalCase'


  # utility

  funced: require './funced'

}
