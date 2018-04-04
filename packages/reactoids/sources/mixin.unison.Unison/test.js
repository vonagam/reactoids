import proxyquire from 'proxyquire';

proxyquire.noCallThru();


const ToggleMixinSpy = defMixinSpy( ToggleMixin );

const UnisonMixin = proxyquire( './index', { '../mixin.meta.Toggle': ToggleMixinSpy } ).default;

defReactMixin( UnisonMixin, () => ( { update: $update, shouldSkip: $shouldSkip, interval: 1, checks: {} } ) );

defSinon( 'update', () => stub() );

defSinon( 'shouldSkip', () => stub().returns( false ) );

defSinon( 'window', () => ( {

  setInterval: stub( window, 'setInterval' ),

  clearInterval: stub( window, 'clearInterval' ),

} ) );


describe( '.argTypes', () => {

  it( 'does have right keys', () =>

    expect( $Mixin.argTypes ).to.have.all.keys( 'name', 'update', 'shouldSkip', 'interval', 'checks' )

  );

  it( 'does have right defaulted keys', () =>

    expect( $Mixin.defaultArgs ).to.have.all.keys( 'name', 'shouldSkip', 'checks' )

  );

  its( ( { value } ) => titleIf( `does approve = ${ doStringify( value[ 0 ] ) }`, value[ 1 ] ), [

    [ {}, false ],

    [ { update: _.noop }, false ],

    [ { update: _.noop, interval: 1 }, true ],

    [ { update: 1, interval: 1 }, false ],

    [ { update: _.noop, interval: '1' }, false ],

    [ { update: _.noop, interval: 1, shouldSkip: _.noop }, true ],

    [ { update: _.noop, interval: 1, name: 'check' }, true ],

    [ { update: _.noop, interval: 1, checks: {} }, true ],

  ], ( [ args, truthy ] ) =>

    expect( args ).onlyIf( truthy ).to.matchTypes( $Mixin.argTypes )

  );

} );

describe( '.constructor', () => {

  contexts( 'with valid arguments = ${ doStringify( value ) }', [

    { update: _.noop, interval: 1 },

    { update: _.noop, interval: 2, name: 'check', checks: {}, shouldSkip: _.noop },

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

      expect( $createMixin() ).to.have.all.keys( 'mixins' )

    );

  } );

} );

describe( 'mixins', () => {

  describe( 'ToggleMixin', () => {

    describe( 'name:', () => {

      contexts( 'with unison name "${ value.input }"', [

        { input: 'check', output: 'checkUnison' },

        { input: 'doable', output: 'doableUnison' },

      ], ( { input, output } ) => {

        def( 'ARGS', () => _.assign( $ARGS, { name: input } ) );


        it( `does passes "${ output }"`, () =>

          expect( $ToggleMixinArgs ).to.include( { name: output } )

        );

      } );

    } );

    describe( 'checks:', () => {

      it( 'does pass without changes', () => {

        let checks = { componentWillUpdate: _.constant( false ) };

        $ARGS.checks = checks;

        expect( $ToggleMixinArgs ).to.include( { checks } );

      } );

    } );

    describe( 'toggle:', () => {

      defFunc( 'toggle', ( instance, bool ) => $ToggleMixinArgs.toggle( instance, bool ) );


      it( 'does call setInterval on first toggle on', () => {

        expect( () => $toggle( {}, true ) ).to.alter( () => $window.setInterval.callCount, { by: 1 } );

        expect( $window.setInterval ).to.have.been.calledWith( sinon.match.func, $ARGS.interval );

      } );

      it( 'does not call setInterval on second toggle on', () => {

        $toggle( 1, true );

        expect( () => $toggle( 2, true ) ).to.alter( () => $window.setInterval.callCount, { by: 1 } );

      } );

      it( 'does call clearInterval on turning off all turned on instances', () => {

        $toggle( 1, true );

        $toggle( 2, true );

        expect( () => $toggle( 1, false ) ).not.to.alter( () => $window.clearInterval.callCount, { from: 0 } );

        expect( () => $toggle( 2, false ) ).to.alter( () => $window.clearInterval.callCount, { from: 0, to: 1 } );

        expect( $window.clearInterval ).to.have.been.calledWith( $window.setInterval.lastCall.returnValue );

      } );

      it( 'does call setInterval after first toggle on since full turning off', () => {

        $toggle( 1, true );

        $toggle( 1, false );

        expect( () => $toggle( 1, true ) ).to.alter( () => $window.setInterval.callCount, { from: 1, to: 2 } );

      } );


      describe( 'intervaled function', () => {

        def( 'instance', {} );

        beforeEach( 'turn on', () => $toggle( $instance, true ) );

        def( 'interval', () => $window.setInterval.firstCall.args[ 0 ] );


        it( 'does calls arg update with instance as argument', () => {

          expect( () => $interval() ).to.alter( () => $update.callCount, { from: 0, to: 1 } );

          expect( $update ).to.have.been.calledWith( $instance );

        } );

        it( 'does calls arg update for all instances', () => {

          $toggle( 2, true );

          expect( () => $interval() ).to.alter( () => $update.callCount, { from: 0, to: 2 } );

          expect( $update ).to.have.been.calledWith( $instance );

          expect( $update ).to.have.been.calledWith( 2 );

        } );

        it( 'does not calls arg update if arg shouldSkip returns true', () => {

          $shouldSkip.returns( true );

          expect( () => $interval() ).not.to.alter( () => $update.callCount, { from: 0 } );

        } );

        it( 'does allow to toggling off instances while updating', () => {

          $toggle( 2, true );

          $toggle( 3, true );

          $update.onFirstCall().callsFake( () => $toggle( 2, false ) );

          expect( () => $interval() ).to.alter( () => $update.callCount, { from: 0, to: 2 } );

          expect( $update ).to.have.been.calledWith( $instance );

          expect( $update ).to.have.been.calledWith( 3 );

          expect( $window.clearInterval ).not.to.have.been.called;

        } );

        it( 'does allow to toggling off all instances while updating', () => {

          $toggle( 2, true );

          $toggle( 3, true );

          $update.onFirstCall().callsFake( () => {

            $toggle( $instance, false );

            $toggle( 2, false );

            $toggle( 3, false );

          } );

          expect( () => $interval() ).to.alter( () => $update.callCount, { from: 0, to: 1 } );

          expect( $window.clearInterval ).to.have.been.calledOnce;

        } );

      } );

    } );

  } );

} );
