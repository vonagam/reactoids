_ = require 'lodash'


getClassNames = ( id, constructor, keys )->=

  name = _.snakeCase constructor.displayName

  classNames = _.transform keys, ( classNames, key )->

    classNames[ key ] = if key == '.' then name else _.last key.split '.'

  , {}

  classNames

##


module.exports = getClassNames
