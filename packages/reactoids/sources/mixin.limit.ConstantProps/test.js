describe( 'mixin.limit.ConstantProps', () => {

  defReactMixin( ConstantPropsMixin, { keys: [ 'key' ] } );


  describe( '.argTypes', () => {

    it( 'does have right keys', () =>

      expect( $Mixin.argTypes ).to.have.all.keys( 'keys' )

    );

    it( 'does have right defaulted keys', () =>

      expect( $Mixin.defaultArgs ).to.be.empty

    );

    its( ( { value } ) => titleIf( `does approve = ${ doStringify( value[ 0 ] ) }`, value[ 1 ] ), [

      [ {}, false ],

      [ { keys: [] }, true ],

      [ { keys: [ 'key' ] }, true ],

      [ { keys: true }, false ],

      [ { keys: [ 4 ] }, false ],

      [ { keys: {} }, false ],

    ], ( [ args, truthy ] ) =>

      expect( args ).onlyIf( truthy ).to.matchTypes( $Mixin.argTypes )

    );

  } );

  describe( '.constructor', () => {

    contexts( 'with arguments = ${ doStringify( value ) }', [

      { keys: [ 'key' ] },

      { keys: [ 'keyA', 'keyB' ] },

    ], ( ARGS ) => {

      def( 'ARGS', ARGS );


      it( 'can be created', () =>

        expect( () => $createMixin() ).not.to.throw()

      );

      it( 'does return different instances', () =>

        expect( $createMixin() ).not.to.equal( $createMixin() )

      );

      it( 'can be mixed', () =>

        expect( () => $checkMixing( $createMixin() ) ).not.to.throw()

      );

      it( 'can be mixed with itself', () =>

        expect( () => $checkMixing( $createMixin(), $createMixin() ) ).not.to.throw()

      );

      it( 'does return object with right properties', () =>

        expect( $createMixin() ).to.have.all.keys( 'componentWillUpdate' )

      );

    } );

  } );

  describe( '#componentWillUpdate', () => {

    def( 'ARGS', { keys: [ 'keyA', 'keyB', 'keyC' ] } );

    def( 'props', { keyA: 1, keyC: { a: 1 }, keyD: 1 } );


    contexts( 'with props changes = ${ doStringify( value.changes ) }', [

      { changes: {}, truthy: false },

      { changes: { keyA: 1 }, truthy: false },

      { changes: { keyA: 2 }, truthy: true },

      { changes: { keyA: undefined }, truthy: true },

      { changes: { keyB: 2 }, truthy: true },

      { changes: { keyC: { a: 1 } }, truthy: false },

      { changes: { keyD: 2 }, truthy: false },

    ], ( { changes, truthy } ) => {

      itIf( 'does throw', truthy, ( truthy ) =>

        expect( () => $mixin.componentWillUpdate.call( { props: $props }, _.assign( {}, $props, changes ) ) ).onlyIf( truthy ).to.throw()

      );

    } );

  } );

} );
