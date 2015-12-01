_ = require 'lodash'


falseyKeys = ( object )->=

  _.keys _.omit object, _.identity


module.exports = falseyKeys
