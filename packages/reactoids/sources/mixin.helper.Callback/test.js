// skip


defReactMixin( CallbackMixin );


describe( '.constructor', () => {

  it( 'can be created without arguments', () =>

    expect( () => $createMixin() ).not.to.throw()

  );

  it( 'does return same instance', () =>

    expect( $createMixin() ).to.equal( $createMixin() )

  );

  it( 'can be mixed', () =>

    expect( () => $checkMixing( $createMixin() ) ).not.to.throw()

  );

  it( 'can be mixed with itself', () =>

    expect( () => $checkMixing( $createMixin(), $createMixin() ) ).not.to.throw()

  );

  it( 'does return object with right properties', () =>

    expect( $createMixin() ).to.have.all.keys( 'callback' )

  );

} );

describe( '#callback', () => {

  defFunc( 'callback', ( ...args ) => $component.callback( ...args ) );

  defFunc( 'call', ( ...args ) => $callback( ...args )( ...$args ) );

  def( 'args', [ 'random', 33 ] );

  defSinon( 'callbacks', {

    'props.hello': spy(),

    'state.world': spy(),

    '!': spy(),

  } );

  const checks = [

    { keys: '', array: [] },

    { keys: 'props.hello', array: [ 'props.hello' ] },

    { keys: 'asd, state.world', array: [ 'asd', 'state.world' ] },

    { keys: [] },

    { keys: [ '!', 'props.unknown' ] },

    { keys: [ 'state.world', 'props.hello' ] },

  ];


  its( 'does throw on invalid argument ${ doStringify( value ) }', [ undefined, null, false, true, 5 ], ( keys ) =>

    expect( () => $callback( keys ) ).to.throw()

  );

  its( 'does return same function for same argument ${ doStringify( value.keys ) }', checks, ( { keys } ) =>

    expect( $callback( keys ) ).to.be.a( 'function' ).that.is.equal( $callback( keys ) )

  );

  context( 'without set values', () => {

    its( 'does not call any callback ${ doStringify( value.keys ) }', checks, ( { keys } ) => {

      $call( keys );

      expect( $callbacks[ 'props.hello' ] ).not.to.be.called;

      expect( $callbacks[ 'state.world' ] ).not.to.be.called;

      expect( $callbacks[ '!' ] ).not.to.be.called;

    } );

  } );

  context( 'with set values', () => {

    beforeEach( 'set values', () => {

      $mount.setProps( { hello: $callbacks[ 'props.hello' ] } );

      $mount.setState( { world: $callbacks[ 'state.world' ] } );

      $component[ '!' ] = $callbacks[ '!' ];

    } );


    its( 'does call relevant callbacks ${ doStringify( value.keys ) }', checks, ( { keys, array } ) => {

      $call( keys );

      _.each( $callbacks, ( callback, key ) => {

        let called = _.includes( array || keys, key );

        expect( callback ).to.have.callCount( called ? 1 : 0 );

        if ( called ) {

          expect( callback ).to.be.calledOn( $component );

          expect( callback ).to.be.calledWithExactly( $args[ 0 ], $args[ 1 ] );

        }

      } );

    } );

    it( 'does preserve order of callbacks', () => {

      $call( 'state.world, props.hello' );

      expect( $callbacks[ 'state.world' ] ).to.be.calledImmediatelyBefore( $callbacks[ 'props.hello' ] );

    } );

  } );

} );
