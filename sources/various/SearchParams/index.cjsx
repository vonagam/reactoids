searchParams = 


  decode: ( search, mapper )->=
    
    params = {}

    return params unless search

    search = search.replace( /(^[^?]*\?|#.*$)/g, '' ).replace( '+', ' ' )

    regexp = /&?([^=]+)=([^&]*)/g

    getMapper =

      if _.isFunction mapper

        ( key )->= mapper

      else if _.isObject mapper

        ( key )->= mapper[ key ] || _.identity

      else

        ( key )->= _.identity

    while tokens = regexp.exec search

      key = decodeURIComponent tokens[ 1 ]

      value = decodeURIComponent tokens[ 2 ]

      value = getMapper( key )( value, key )

      params[ key ] = value

    params


  encode: ( params )->=

    return '' if _.isEmpty params

    '?' + _.map( params, ( value, key )->= "#{ encodeURIComponent key }=#{ encodeURIComponent value }" ).join '&'


module.exports = searchParams
