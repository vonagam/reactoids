_ = require 'lodash'

getVariantString = require './getVariantString'


getVariationString = ( variation )->=

  result = _.map variation, ( key, variant )->=

    "#{ key }:#{ getVariantString variant }"

  result = result.join ' '

  result
  

module.exports = getVariationString
