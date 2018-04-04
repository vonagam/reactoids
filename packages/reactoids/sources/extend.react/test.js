describe( 'PropTypes', () => {

  defFunc( 'assertProp', ( type, value, truthy ) =>

    expect( () => assertPropTypes( { key: type }, { key: value } ) ).onlyIf( ! truthy ).to.throw()

  );


  describe( 'collection', () => {

    its( ( { value } ) => titleIf( `does pass ${ doStringify( value[ 0 ] ) }`, value[ 1 ] ), [

      [ {}, true ],

      [ [], true ],

      [ 1, false ],

      [ 'string', false ],

    ], ( [ value, truthy ] ) =>

      $assertProp( PropTypes.collection, value, truthy )

    );

  } );

  describe( 'collectionOf', () => {

    context( '(string)', () => {

      its( ( { value } ) => titleIf( `does pass ${ doStringify( value[ 0 ] ) }`, value[ 1 ] ), [

        [ { key: 'string' }, true ],

        [ [ 'string' ], true ],

        [ { key: 1 }, false ],

        [ [ 1 ], false ],

        [ 1, false ],

        [ 'string', false ],

      ], ( [ value, truthy ] ) =>

        $assertProp( PropTypes.collectionOf( PropTypes.string ), value, truthy )

      );

    } );

    context( '(number)', () => {

      its( ( { value } ) => titleIf( `does pass ${ doStringify( value[ 0 ] ) }`, value[ 1 ] ), [

        [ { key: 'string' }, false ],

        [ [ 'string' ], false ],

        [ { key: 1 }, true ],

        [ [ 1 ], true ],

        [ 1, false ],

        [ 'string', false ],

      ], ( [ value, truthy ] ) =>

        $assertProp( PropTypes.collectionOf( PropTypes.number ), value, truthy )

      );

    } );

  } );

  describe( 'funced', () => {

    context( '(string)', () => {

      its( ( { value } ) => titleIf( `does pass ${ doStringify( value[ 0 ] ) }`, value[ 1 ] ), [

        [ _.noop, true ],

        [ 'string', true ],

        [ 1, false ],

        [ {}, false ],

      ], ( [ value, truthy ] ) =>

        $assertProp( PropTypes.funced( PropTypes.string ), value, truthy )

      );

    } );

    context( '([string, number])', () => {

      its( ( { value } ) => titleIf( `does pass ${ doStringify( value[ 0 ] ) }`, value[ 1 ] ), [

        [ _.noop, true ],

        [ 'string', true ],

        [ 1, true ],

        [ {}, false ],

      ], ( [ value, truthy ] ) =>

        $assertProp( PropTypes.funced( PropTypes.string, PropTypes.number ), value, truthy )

      );

    } );

  } );

  describe( 'oneOrArrayOf', () => {

    context( '(string)', () => {

      its( ( { value } ) => titleIf( `does pass ${ doStringify( value[ 0 ] ) }`, value[ 1 ] ), [

        [ 'string', true ],

        [ [ 'string', 'next' ], true ],

        [ _.noop, false ],

        [ 1, false ],

        [ {}, false ],

      ], ( [ value, truthy ] ) =>

        $assertProp( PropTypes.oneOrArrayOf( PropTypes.string ), value, truthy )

      );

    } );

    context( '([string, number])', () => {

      its( ( { value } ) => titleIf( `does pass ${ doStringify( value[ 0 ] ) }`, value[ 1 ] ), [

        [ 'string', true ],

        [ [ 'string', 'next' ], true ],

        [ _.noop, false ],

        [ 1, true ],

        [ {}, false ],

      ], ( [ value, truthy ] ) =>

        $assertProp( PropTypes.oneOrArrayOf( PropTypes.oneOfType( [ PropTypes.string, PropTypes.number ] ) ), value, truthy )

      );

    } );

  } );

} );
