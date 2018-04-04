import proxyquire from 'proxyquire';

proxyquire.noCallThru();


const UnisonMixinSpy = defMixinSpy( UnisonMixin );

const UrlWatcherMixin = proxyquire( './index', { '../mixin.unison.Unison': UnisonMixinSpy } ).default;

defReactMixin( UrlWatcherMixin, () => ( { shouldSkip: $shouldSkip } ) );

defSinon( 'shouldSkip', spy() );


describe( '.argTypes', () => {

  it( 'does have right keys', () =>

    expect( $Mixin.argTypes ).to.have.all.keys( 'name', 'shouldSkip', 'update', 'interval', 'checks' )

  );

  it( 'does have right defaulted keys', () =>

    expect( $Mixin.defaultArgs ).to.have.all.keys( 'name', 'shouldSkip', 'update', 'interval', 'checks' )

  );

  its( ( { value } ) => titleIf( `does approve = ${ doStringify( value[ 0 ] ) }`, value[ 1 ] ), [

    [ {}, true ],

    [ { name: 'check', shouldSkip: _.noop, update: _.noop, interval: 1, checks: {} }, true ],

  ], ( [ args, truthy ] ) =>

    expect( args ).onlyIf( truthy ).to.matchTypes( $Mixin.argTypes )

  );

} );

describe( '.constructor', () => {

  contexts( 'with valid arguments = ${ doStringify( value ) }', [

    {},

    { name: 'check', shouldSkip: _.noop, update: _.noop, interval: 1, checks: {} },

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

describe( '#mixins', () => {

  describe( 'UnisonMixin', () => {

    describe( 'name:', () => {

      contexts( 'with wathcing name "${ value.input }"', [

        { input: 'check', output: 'checkUrlWatch' },

        { input: 'doable', output: 'doableUrlWatch' },

      ], ( { input, output } ) => {

        def( 'ARGS', () => _.assign( $ARGS, { name: input } ) );


        it( `does passes "${ output }"`, () =>

          expect( $UnisonMixinArgs ).to.include( { name: output } )

        );

      } );

    } );

    describe( 'shouldSkip:', () => {

      defLocation( 'https://a.com/' );

      defSinon( 'shouldSkip', () => stub().returns( 'yep' ) );


      it( 'does return true if href has not changed', () => {

        expect( $UnisonMixinArgs.shouldSkip() ).to.be.true;

        expect( $shouldSkip ).not.to.be.called;

      } );

      it( 'does return arg shouldSkip result if href has changed', () => {

        $UnisonMixinArgs;

        $setLocation( 'https://b.com/' );

        expect( $shouldSkip ).not.to.be.called;

        let should = $UnisonMixinArgs.shouldSkip();

        expect( should ).to.be.eq( $shouldSkip.lastCall.returnValue );

        expect( $shouldSkip ).to.be.calledOnce.and.be.calledWithExactly( 'https://b.com/', 'https://a.com/' );

        expect( $UnisonMixinArgs.shouldSkip() ).to.be.true;

        expect( $shouldSkip ).to.be.calledOnce;

      } );

    } );

    describe( 'update:, interval:, checks:', () => {

      it( 'does pass without changes', () => {

        let args = { update: function() {}, interval: 99, checks: {} };

        _.assign( $ARGS, args );

        expect( $UnisonMixinArgs ).to.include( args );

      } );

    } );

  } );

} );
