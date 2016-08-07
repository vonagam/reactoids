_ = require 'lodash'


getStrings = ( id, constructor, keys )->=

  strings = _.transform keys, ( strings, key )->

    strings[ key ] = '#' + key

  , {}

  strings

##


module.exports = getStrings
