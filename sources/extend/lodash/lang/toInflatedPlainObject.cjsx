_ = require 'lodash'


toInflatedPlainObject = ( source )->=

  _.transform source, ( accumulator, value, path )->

    _.set accumulator, path, value

  , {}


module.exports = toInflatedPlainObject
