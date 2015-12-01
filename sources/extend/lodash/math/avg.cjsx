_ = require 'lodash'


avg = ( collection, iteratee, thisArg )->=

  _.sum( collection, iteratee, thisArg ) / _.size( collection )


module.exports = avg
