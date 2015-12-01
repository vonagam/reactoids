_ = require 'lodash'


eacho = ( value, iteratee, thisArg )->

  if _.isArray value

    _.each value, iteratee, thisArg

  else

    iteratee.call thisArg, value


module.exports = eacho
