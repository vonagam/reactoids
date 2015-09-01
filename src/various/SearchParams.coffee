searchParams = 


  decode: ( search )->=
    
    params = {}

    return params unless search

    search = search.replace( /(^[^\?]*\?|#.*$)/g, '' ).replace( '+', ' ' )

    regexp = /&?([^=]+)=([^&]*)/g

    while tokens = regexp.exec search

      params[ decodeURIComponent tokens[ 1 ] ] = decodeURIComponent tokens[ 2 ]

    params


  encode: ( params )->=

    return '' if _.isEmpty params

    '?' + _.map( params, ( value, key )-> "#{ encodeURIComponent key }=#{ encodeURIComponent value }" ).join '&'


module.exports = searchParams
