_ = require 'lodash'


binded = ( object, path, thisArg )->=

  _.bind _.get( object, path ), thisArg || object


module.exports = binded
