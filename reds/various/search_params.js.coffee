$define ->


  SearchParams = 

    decode: ( search )->
      
      params = {}

      return params unless search

      search = search.replace( /^\?/, '' ).replace( '+', ' ' )

      regexp = /&?([^=]+)=([^&]*)/g

      while tokens = regexp.exec search

        params[ decodeURIComponent tokens[ 1 ] ] = decodeURIComponent tokens[ 2 ]

      params

    encode: ( params )->

      params = _.transform params, ( result, value, key )->

        result.push encodeURIComponent( key ) + '=' + encodeURIComponent( value )

        return

      , []

      return '' if params.length == 0

      '?' + params.join '&'
