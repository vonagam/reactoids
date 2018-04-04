defReactMixin( CacheMixin );


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

    expect( $createMixin() ).to.have.all.keys( 'getInitialMembers', 'componentWillUpdate', 'cache', 'clearCache' )

  );

} );

describe( '#getInitialMembers', () => {

  it( 'does contain mixin private state', () =>

    expect( $mixin.getInitialMembers() ).to.have.property( '_CacheMixin' )

  );

} );

describe( '#cache', () => {

  defFunc( 'cache', () => $component.cache( $key, $options() ) );

  def( 'key', 'daydream' );

  defFunc( 'options', () => ( {} ) );


  contexts( 'with ${ value }', [ 'getter', 'value' ], ( type ) => {

    let isGetter = type === 'getter';

    let isValue = type === 'value';

    defSinon( 'generator', stub().callsFake( () => _.random( 0, 1, true ) ) );

    if ( isGetter ) {

      defFunc( 'options', () => ( { getter: $generator } ) );

    }

    if ( isValue ) {

      defFunc( 'options', () => ( { value: $generator() } ) );

    }


    it( 'does not call generator on mount', () =>

      expect( () => $mount ).not.to.alter( () => $generator.callCount, { from: 0 } )

    );

    itIf( 'does call generator in context of component with cache key as argument', type === 'getter', ( truthy ) => {

      $cache();

      expect( $generator ).to.be.calledOnce;

      expect( $generator ).onlyIf( truthy ).to.be.calledOn( $component );

      expect( $generator ).onlyIf( truthy ).to.be.calledWithExactly( $key, $component );

    } );


    contexts( 'with ${ value } previous calls', [ 0, 1, 2 ], ( count ) => {

      beforeEach( 'call cache', () => _.times( count, () => $cache( $key, $options ) ) );


      itIf( 'does call generator', count == 0 || isValue, ( truthy ) =>

        expect( () => $cache() ).to.alter( () => $generator.callCount, { by: truthy ? 1 : 0 } )

      );

      it( 'does return first generated value', () =>

        expect( $cache() ).to.equal( $generator.firstCall.returnValue )

      );

    } );


    contexts( 'with depends = ${ doStringify( value ) }', [

      undefined,

      [],

      [ 'state.flowers' ],

      [ 'state.flowers', 'props.hours' ],

    ], ( depends ) => {

      def( 'options', () => {

        let options = $options;

        return () => _.defaults( { depends }, options() );

      } );

      beforeEach( 'call cache', () => $cache() );


      contexts( 'with state.${ value } update', [ 'flowers', 'stars' ], ( key ) => {

        beforeEach( ( done ) => $mount.setState( { [ key ]: true }, done ) );


        itIf( 'does update cache', _.includes( depends, `state.${ key }` ), ( truthy ) => {

          let cache;

          expect( () => { cache = $cache() } ).to.alter( () => $generator.callCount, { by: truthy || isValue ? 1 : 0 } );

          expect( cache ).to.equal( $generator[ truthy ? 'lastCall' : 'firstCall' ].returnValue );

        } );

      } );

      contexts( 'with props.${ value } update', [ 'hours', 'minutes' ], ( key ) => {

        beforeEach( ( done ) => $mount.setProps( { [ key ]: true }, done ) );


        itIf( 'does update cache', _.includes( depends, `props.${ key }` ), ( truthy ) => {

          let cache;

          expect( () => { cache = $cache() } ).to.alter( () => $generator.callCount, { by: truthy || isValue ? 1 : 0 } );

          expect( cache ).to.equal( $generator[ truthy ? 'lastCall' : 'firstCall' ].returnValue );

        } );

      } );

    } );

  } );

} );

describe( '#clearCache', () => {

  defFunc( 'clearCache', ( ...args ) => $component.clearCache( ...args ) );

  defFunc( 'cache', () => $component.cache( $key, $options() ) );

  def( 'key', 'daydream' );

  defFunc( 'options', () => ( { getter: $generator } ) );

  defSinon( 'generator', stub().callsFake( () => _.random( 0, 1, true ) ) );


  its( ( { value } ) => titleIf( 'does clear daydream keyed cache ', value.clears ) + ( value.args ? `with arguments = ${ doStringify( value.args ) }` : 'without call' ), [

    { args: false, clears: false },

    { args: [], clears: true },

    { args: [ 'daydream' ], clears: true },

    { args: [ 'nightmare' ], clears: false },

  ], ( { args, clears } ) => {

    $cache();

    if ( args ) $clearCache( ...args );

    expect( () => $cache() ).onlyIf( clears ).to.alter( () => $generator.callCount, { by: 1 } );

    expect( $cache() ).to.equal( $generator[ clears ? 'lastCall' : 'firstCall' ].returnValue );

  } );

} );
