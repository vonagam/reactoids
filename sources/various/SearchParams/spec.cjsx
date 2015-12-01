describe 'SearchParams', ->

  SearchParams = requireSubject()


  checkChecks = ( method, checks )->

    _.each checks, ( check )->

      it check.title, ->

        expect( SearchParams[ method ].apply SearchParams, check.input ).eql check.output


  describe '::encode', ->

    checkChecks 'encode', [

      {
        title: 'undefined'
        input: [ undefined ]
        output: ''
      }
      {
        title: 'empty object'
        input: [ {} ]
        output: ''
      }
      {
        title: 'single'
        input: [ { a: 3 } ]
        output: '?a=3'
      }
      {
        title: 'doable'
        input: [ { a: 3, b: 4 } ]
        output: '?a=3&b=4'
      }
      {
        title: 'space in key'
        input: [ { 'a b': 3 } ]
        output: '?a%20b=3'
      }

    ]


  describe '::decode', ->

    checkChecks 'decode', [

      { 
        title: 'empty string'
        input: [ '' ]
        output: {}
      }
      { 
        title: 'single'
        input: [ '?a=3' ]
        output: { a: '3' }
      }
      {
        title: 'doable'
        input: [ '?a=3&b=4' ]
        output: { a: '3', b: '4' }
      }
      {
        title: 'without question mark'
        input: [ 'a=3' ]
        output: { a: '3' }
      }
      {
        title: 'with mapper function'
        input: [ '?a=3', ( value )->= parseFloat value ]
        output: { a: 3 }
      }
      {
        title: 'with mapper function 2'
        input: [ '?a=3&b=4', ( value, key )->= if key == 'a' then parseFloat( value ) else value ]
        output: { a: 3, b: '4' }
      }
      {
        title: 'with mapper functions object'
        input: [ '?a=3&b=4', b: ( value )->= parseFloat value ]
        output: { a: '3', b: 4 }
      }

    ]
