_ = require 'lodash'


getVariantString = ( variant )->=

  result = switch

    when _.isFunction variant

      variant.toString().replace( /^function\s/, '' ).replace( /\n/g, ' ' ).replace( /\s+/g, ' ' )

    when _.isString( variant ) || _.isObject( variant )

      JSON.stringify variant

    when _.isUndefined variant

      'undefined'

    else

      variant

    ##

  ##

  result

##


module.exports = getVariantString
