_ = require 'lodash'


getClassNames = ( constructor, keys, id )->=

  classNames = _.transform keys, ( classNames, key )->

    classNames[ key ] = (

      if key == '.'

        _.snakeCase constructor.displayName

      else

        _.last key.split '.'

      ##

    )

  , {}


  classNames

##


module.exports = getClassNames
