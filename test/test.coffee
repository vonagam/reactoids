expect = require( 'chai' ).expect


a = -> 3
b = ->= 3


it 'check', ->

  expect( a() ).to.equal( undefined )

  expect( b() ).to.equal( 3 )
