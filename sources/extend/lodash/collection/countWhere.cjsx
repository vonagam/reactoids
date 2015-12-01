_ = require 'lodash'


countWhere = ( collection, source )->=

  matches = _.matches source

  _.reduce collection, ( count, value )->

    return count + 1 if matches value

    return count

  , 0


module.exports = countWhere
