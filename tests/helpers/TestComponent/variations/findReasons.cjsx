_ = require 'lodash'

getVariantString = require './getVariantString'


getScheme = ( variations )->=

  keys = _.keys variations[ 0 ] # assumes that all present in all variation

  _.transform keys, ( scheme, key )->

    scheme[ key ] = _.uniq _.pluck variations, key

  , {}


findReasons = ( variationsAll, variationsBad )->=

  # simple algoritm, it doesn't look for covariance or stuff like this

  if variationsAll.length == variationsBad.length

    return 'all'

  schemeAll = getScheme variationsAll

  schemeBad = getScheme variationsBad

  schemeReasons = {}

  _.each schemeBad, ( variants, key )->

    variantsAll = schemeAll[ key ]

    variantsBad = schemeBad[ key ]

    if variantsAll.length == variantsBad.length

      return

    difference = _.difference variantsAll, variantsBad

    schemeReasons[ key ] = switch

      when difference.length == 1 && variantsAll.length > 2

        "not #{ getVariantString difference[ 0 ] }"

      when variantsBad.length == 1

        "only #{ getVariantString variantsBad[ 0 ] }"

      else

        "in ( #{ _.map( variantsBad, getVariantString ).join( ', ' ) } )"

  if _.isEmpty schemeReasons

    return 'tough case...'
  
  result = _.map schemeReasons, ( message, key )->= 

    "#{ key }(#{ schemeBad[ key ].length }/#{ schemeAll[ key ].length }): #{ message }"

  result = result.join ', '

  result


module.exports = findReasons
