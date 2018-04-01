describe( 'mixin.customization.RenderProp', () => {

  defReactMixin( RenderPropMixin );


  describe( '.argTypes', () => {

    it( 'does have right keys', () =>

      expect( $Mixin.argTypes ).to.have.all.keys( 'getRenderArg' )

    );

    it( 'does have right defaulted keys', () =>

      expect( $Mixin.defaultArgs ).to.have.all.keys( 'getRenderArg' )

    );

    its( ( { value } ) => titleIf( `does approve = ${ doStringify( value[ 0 ] ) }`, value[ 1 ] ), [

      [ {}, true ],

      [ { getRenderArg: _.noop }, true ],

      [ { getRenderArg: 1 }, false ],

    ], ( [ args, truthy ] ) =>

      expect( args ).onlyIf( truthy ).to.matchTypes( $Mixin.argTypes )

    );

  } );

  describe( '.constructor', () => {

    contexts( 'with arguments = ${ doStringify( value ) }', [

      {},

      { getRenderArg: _.noop },

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

      it( 'cannot be mixed with itself', () =>

        expect( () => $checkMixing( $createMixin(), $createMixin() ) ).to.throw()

      );

      it( 'does return object with right properties', () =>

        expect( $createMixin() ).to.have.all.keys( 'propTypes', 'render' )

      );

    } );

  } );

  describe( '#propTypes', () => {

    it( 'does have right keys', () =>

      expect( $mixin.propTypes ).to.have.all.keys( 'children' )

    );

    its( ( { value } ) => titleIf( `does approve = ${ doStringify( value[ 0 ] ) }`, value[ 1 ] ), [

      [ {}, true ],

      [ { children: 'string' }, true ],

      [ { children: _.noop }, true ],

    ], ( [ props, truthy ] ) =>

      expect( props ).onlyIf( truthy ).to.matchTypes( $mixin.propTypes )

    );

  } );

  describe( '#render', () => {

    defSinon( 'ARGS', { getRenderArg: spy( _.constant( 4 ) ) } );


    context( 'with function', () => {

      defSinon( 'props', { children: spy( _.constant( 'check' ) ) } );


      it( 'does calls getRenderArg', () => {

        expect( () => $mount ).to.alter( () => $ARGS.getRenderArg.callCount, { from: 0, to: 1 } );

        expect( $ARGS.getRenderArg ).to.be.calledWithExactly( $component );

      } );

      it( 'does call provided function', () => {

        expect( () => $mount ).to.alter( () => $props.children.callCount, { from: 0, to: 1 } );

        expect( $props.children ).to.be.calledWithExactly( $component, $ARGS.getRenderArg.lastCall.returnValue );

      } );

      it( 'does render return value of function', () =>

        expect( $mount ).to.contain( $props.children.lastCall.returnValue )

      );

    } );

    contexts( 'with ${ key }', {

      string: 'hello',

      array: [ '4', '5' ],

    }, ( children ) => {

      def( 'props', () => ( { children: children } ) );


      it( 'does render provided value', () =>

        expect( $mount ).to.contain( children )

      );

    } );

  } );

} );
