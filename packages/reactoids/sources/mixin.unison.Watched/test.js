import proxyquire from 'proxyquire';

proxyquire.noCallThru();


describe( 'WatchedMixin', () => {

  const UnisonMixinSpy = defMixinSpy( UnisonMixin );

  const WatchedMixin = proxyquire( './index', { '../mixin.unison.Unison': UnisonMixinSpy } ).default;

  defReactMixin( WatchedMixin, () => ( { getValue: $getValue, onChange: $onChange, interval: 1 } ) );

  defSinon( 'getValue', () => stub() );

  defSinon( 'onChange', spy() );

  defSinon( 'window', () => ( {

    setInterval: stub( window, 'setInterval' ),

    clearInterval: stub( window, 'clearInterval' ),

  } ) );


  describe( '.argTypes', () => {

    it( 'does have right keys', () =>

      expect( $Mixin.argTypes ).to.have.all.keys( 'name', 'getValue', 'onChange', 'shouldSkip', 'interval', 'checks' )

    );

    it( 'does have right defaulted keys', () =>

      expect( $Mixin.defaultArgs ).to.have.all.keys( 'name', 'shouldSkip', 'checks' )

    );

    its( ( { value } ) => titleIf( `does approve = ${ doStringify( value[ 0 ] ) }`, value[ 1 ] ), [

      [ {}, false ],

      [ { getValue: _.noop }, false ],

      [ { getValue: _.noop, onChange: _.noop }, false ],

      [ { getValue: _.noop, onChange: _.noop, interval: 1 }, true ],

      [ { getValue: 1, onChange: _.noop, interval: 2 }, false ],

      [ { getValue: _.noop, onChange: '1', interval: 3 }, false ],

      [ { getValue: _.noop, onChange: _.noop, interval: 4, name: 'check' }, true ],

      [ { getValue: _.noop, onChange: _.noop, interval: 5, shouldSkip: _.noop, checks: {} }, true ],

    ], ( [ args, truthy ] ) =>

      expect( args ).onlyIf( truthy ).to.matchTypes( $Mixin.argTypes )

    );

  } );

  describe( '.constructor', () => {

    contexts( 'with valid arguments = ${ doStringify( value ) }', [

      { getValue: _.noop, onChange: _.noop, interval: 1 },

      { getValue: _.noop, onChange: _.noop, interval: 1, name: 'check', shouldSkip: _.noop, checks: {} },

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

      it( 'cannot be mixed with itself with same name', () =>

        expect( () => $checkMixing( $createMixin(), $createMixin() ) ).to.throw()

      );

      it( 'can be mixed with itself with different name', () =>

        expect( () => $checkMixing( $createMixin(), $createMixin( { name: 'different' } ) ) ).not.to.throw()

      );

      it( 'does return object with right properties', () =>

        expect( $createMixin() ).to.have.all.keys( 'mixins', 'getInitialMembers', 'componentDidMount' )

      );

    } );

  } );

  describe( '#mixins', () => {

    describe( 'UnisonMixin', () => {

      describe( 'name:', () => {

        contexts( 'with wathcing name "${ value.input }"', [

          { input: 'check', output: 'checkWatching' },

          { input: 'doable', output: 'doableWatching' },

        ], ( { input, output } ) => {

          def( 'ARGS', () => _.assign( $ARGS, { name: input } ) );


          it( `does passes "${ output }"`, () =>

            expect( $UnisonMixinArgs ).to.include( { name: output } )

          );

        } );

      } );

      describe( 'update:', () => {

        defFunc( 'update', () => $UnisonMixinArgs.update( $instance ) );

        def( 'instance', () => ( { _WatchedMixin: 1 } ) );


        it( 'does call getValue on instance every time', () =>

          _.times( 3, () => expect( () => $update() ).to.alter( () => $getValue.callCount, { by: 1 } ) )

        );

        it( 'does not call onChange without change in stored value and provided', () => {

          $getValue.returns( 1 );

          _.times( 3, () => expect( () => $update() ).not.to.alter( () => $onChange.callCount, { from: 0 } ) );

        } );

        it( 'does call onChange with change in previous value and provided', () => {

          $getValue.returns( 1 );

          $update();

          $getValue.returns( 2 );

          expect( () => $update() ).to.alter( () => $onChange.callCount, { from: 0, to: 1 } );

          expect( () => $update() ).not.to.alter( () => $onChange.callCount, { from: 1 } );

          expect( $onChange ).to.be.calledWithExactly( $instance, 2, 1 );

        } );

      } );

      describe( 'shouldSkip:, interval:, checks:', () => {

        it( 'does pass without changes', () => {

          let args = { shouldSkip: function() { return false }, interval: 99, checks: {} };

          _.assign( $ARGS, args );

          expect( $UnisonMixinArgs ).to.include( args );

        } );

      } );

    } );

  } );

  describe( '#getInitialMembers', () => {

    it( 'does contain mixin private state', () =>

      expect( $mixin.getInitialMembers() ).to.have.property( '_WatchedMixin' )

    );

  } );

  describe( '#componentDidMount', () => {

    contexts( {

      'with change': 1,

      'without change': undefined,

    }, ( value ) => {

      beforeEach( 'set getValue result', () => $getValue.returns( value ) );


      itIf( 'does call onChange with instance, new value and undefined', value !== undefined, ( truthy ) => {

        expect( () => $mount ).to.alter( () => $onChange.callCount, { from: 0, to: +truthy } );

        expect( $onChange ).onlyIf( truthy ).to.be.calledWithExactly( $component, value, undefined );

      } );

    } );

  } );

} );
