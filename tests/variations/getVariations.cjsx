_ = require 'lodash'


getVariations = ( scheme )->=

  # TODO: check if recursive method is faster

  return [] if _.isEmpty scheme

  return Array.prototype.concat.apply [], _.map scheme, getVariations if _.isArray scheme


  variations = []

  values = _.map scheme, ( variants, key )->=

    value = {}

    value.key = key

    value.variants = [ undefined ].concat variants

    value

  ##


  variantsIndexes = _.times values.length, ->= 0

  currentIndex = undefined

  while currentIndex != variantsIndexes.length


    variation = _.transform values, ( variation, value, index )->

      variation[ value.key ] = value.variants[ variantsIndexes[ index ] ]

    , {}

    variations.push variation


    currentIndex = 0

    while currentIndex < variantsIndexes.length

      variantsIndexes[ currentIndex ]++

      break unless variantsIndexes[ currentIndex ] == values[ currentIndex ].variants.length

      variantsIndexes[ currentIndex ] = 0

      currentIndex++

    ##

  ##


  variations

##


module.exports = getVariations
