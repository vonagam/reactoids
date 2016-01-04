_ = require 'lodash'


getVariations = ( scheme )->=

  # TODO: check if recursive method is faster

  return Array.prototype.concat.apply [], _.map scheme, getVariations if _.isArray scheme


  variations = []

  values = _.map scheme, ( variants, key )->=

    value = {}

    value.key = key

    value.variants = [ undefined ].concat variants

    value

  ##

  variantsIndexes = _.times values.length, ->= 0


  currentIndex = 0

  while currentIndex != variantsIndexes.length

    variation = _.transform values, ( variation, value, index )->

      variation[ value.key ] = value.variants[ variantsIndexes[ index ] ]

    , {}


    variations.push variation


    currentIndex = 0

    while currentIndex != variantsIndexes.length

      variantsIndexes[ currentIndex ]++

      if variantsIndexes[ currentIndex ] == values[ currentIndex ].variants.length

        variantsIndexes[ currentIndex ] = 0

        currentIndex++

      else

        break

      ##

    ##

  ##


  variations

##


module.exports = getVariations
