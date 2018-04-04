describe( 'array', () => {

  describe( '_.append', () => {

    it( 'does push values to an end of an array and return the array', () => {

      let a = [ 1, 2 ];

      let b = [ 3, 4 ];

      let c = _.append( a, b );

      expect( c ).to.eql( [ 1, 2, 3, 4 ] );

      expect( c ).to.equal( a );

    } );

  } );

  describe( '_.insert', () => {

    it( 'does push values to specified index of an array and return the array', () => {

      let a = [ 1, 2 ];

      let b = [ 3, 4 ];

      let c = _.insert( a, 1, b );

      expect( c ).to.eql( [ 1, 3, 4, 2 ] );

      expect( c ).to.equal( a );

    } );

  } );

  describe( '_.prepend', () => {

    it( 'does push values to a start of an array and return the array', () => {

      let a = [ 1, 2 ];

      let b = [ 3, 4 ];

      let c = _.prepend( a, b );

      expect( c ).to.eql( [ 3, 4, 1, 2 ] );

      expect( c ).to.equal( a );

    } );

  } );

} );

describe( 'collection', () => {

  describe( '_.count', () => {

    it( 'does count members of an collection strict equal to provided value', () => {

      expect( _.count( [ 1, 2, 1, 3 ], 1 ) ).to.equal( 2 );

      expect( _.count( { x: 1, y: 2, z: 1 }, 2 ) ).to.equal( 1 );

    } );

  } );

  describe( '_.none', () => {

    it( 'does return opposite of _.some', () => {

      expect( _.none( [ 1, 2 ], ( number ) => number < 0 ) ).to.be.true;

      expect( _.none( [ 1, 2 ], ( number ) => number > 0 ) ).to.be.false;

    } );

  } );

} );

describe( 'function', () => {

  describe( '_.queue', () => {

    it( 'does return function which will call provided functions on its invocation', () => {

      let spyA = spy();

      let spyB = spy();

      let queue = _.queue( spyA, undefined, spyB, 4, null );

      expect( spyA ).not.to.be.called;

      expect( spyB ).not.to.be.called;

      queue( 1, 2 );

      expect( spyA ).to.be.calledOnce.and.calledWith( 1, 2 );

      expect( spyB ).to.be.calledOnce.and.calledWith( 1, 2 );

      expect( spyB ).to.be.calledImmediatelyAfter( spyA );

    } );

  } );

} );

describe( 'lang', () => {

  describe( '_.toFlattenedPlainObject', () => {

    it( 'does return new object which get by flattening nested objects to single level', () =>

      expect( _.toFlattenedPlainObject( { x: 1, y: { z: 2 } } ) ).to.be.eql( { x: 1, 'y.z': 2 } )

    );

  } );

  describe( '_.toInflatedPlainObject', () => {

    it( 'does return new object which get by reversing flattening', () =>

      expect( _.toInflatedPlainObject( { x: 1, 'y.z': 2 } ) ).to.be.eql( { x: 1, y: { z: 2 } } )

    );

  } );

} );

describe( 'object', () => {

  describe( '_.falseyKeys', () => {

    it( 'does return array of object keys which value in object are falsey', () =>

      expect( _.falseyKeys( { x: 0, y: false, z: 11 } ) ).to.be.eql( [ 'x', 'y' ] )

    );

  } );

  describe( '_.hasOwn', () => {

    it( 'does return result of calling hasOwnProperty on provided object with provided key', () =>

      expect( _.hasOwn( { x: 0 }, 'x' ) ).to.be.true

    );

  } );

  describe( '_.truthyKeys', () => {

    it( 'does return array of object keys which value in object are truthy', () =>

      expect( _.truthyKeys( { x: 0, y: true, z: 11 } ) ).to.be.eql( [ 'y', 'z' ] )

    );

  } );

} );

describe( 'string', () => {

  describe( '_.pascalCase', () => {

    it( 'does convert string to pascal case', () =>

      expect( _.pascalCase( 'hello world' ) ).to.be.eql( 'HelloWorld' )

    );

  } );

} );

describe( 'utility', () => {

  describe( '_.funced', () => {

    it( 'does return result of function invocation with provided arguments if first argument is a function', () =>

      expect( _.funced( _.identity, 4 ) ).to.be.eql( 4 )

    );

    it( 'does return first argument if it is not a function', () =>

      expect( _.funced( 5, 4 ) ).to.be.eql( 5 )

    );

  } );

} );
