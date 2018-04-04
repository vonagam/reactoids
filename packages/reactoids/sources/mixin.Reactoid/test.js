import proxyquire from 'proxyquire';

proxyquire.noCallThru();


describe( 'mixin.Reactoid', () => {

  const PureRenderMixinSpy = _.assign( spy( PureRenderMixin ), PureRenderMixin );

  const ClassedMixinSpy = _.assign( spy( ClassedMixin ), ClassedMixin );

  const StringedMixinSpy = _.assign( spy( StringedMixin ), StringedMixin );

  const RenderSlotsMixinSpy = _.assign( spy( RenderSlotsMixin ), RenderSlotsMixin );

  const StateKeyMixinSpy = _.assign( spy( StateKeyMixin ), StateKeyMixin );

  const OmitPropsMixinSpy = _.assign( spy( OmitPropsMixin ), OmitPropsMixin );

  const RefMixinSpy = _.assign( spy( RefMixin ), RefMixin );

  const DomMixinSpy = _.assign( spy( DomMixin ), DomMixin );

  const CallbackMixinSpy = _.assign( spy( CallbackMixin ), CallbackMixin );

  const CacheMixinSpy = _.assign( spy( CacheMixin ), CacheMixin );


  const mixins = {

    '../mixin.limit.PureRender': PureRenderMixinSpy,

    '../mixin.customization.Classed': ClassedMixinSpy,

    '../mixin.customization.Stringed': StringedMixinSpy,

    '../mixin.customization.RenderSlots': RenderSlotsMixinSpy,

    '../mixin.helper.StateKey': StateKeyMixinSpy,

    '../mixin.helper.OmitProps': OmitPropsMixinSpy,

    '../mixin.helper.Ref': RefMixinSpy,

    '../mixin.helper.Dom': DomMixinSpy,

    '../mixin.helper.Callback': CallbackMixinSpy,

    '../mixin.helper.Cache': CacheMixinSpy,

  };

  const ReactoidMixin = proxyquire( './index', mixins ).default;

  defReactMixin( ReactoidMixin );

  defSinon( 'mixins', mixins );


  describe( '.argTypes', () => {

    it( 'does have right keys', () =>

      expect( $Mixin.argTypes ).to.have.all.keys( 'pure', 'classes', 'strings', 'slots', 'purifiedPaths', 'dirtiedPaths' )

    );

    it( 'does have right defaulted keys', () =>

      expect( $Mixin.defaultArgs ).to.have.all.keys( 'pure', 'classes', 'strings', 'slots', 'purifiedPaths', 'dirtiedPaths' )

    );

    its( ( { value } ) => titleIf( `does approve = ${ doStringify( value[ 0 ] ) }`, value[ 1 ] ), [

      [ {}, true ],

      [ { pure: false, classes: false, strings: false, slots: false }, true ],

      [ { pure: true, classes: {}, strings: [], slots: {}, purifiedPaths: [], dirtiedPaths: [] }, true ],

    ], ( [ args, truthy ] ) =>

      expect( args ).onlyIf( truthy ).to.matchTypes( $Mixin.argTypes )

    );

  } );

  describe( '.constructor', () => {

    contexts( 'with valid arguments = ${ doStringify( value ) }', [

      {},

      { pure: false, classes: false, strings: false, slots: false, },

      { pure: true, classes: {}, strings: [], slots: {}, purifiedPaths: [], dirtiedPaths: [] },

    ], ( ARGS ) => {

      def( 'ARGS', ARGS );


      it( 'can be created without arguments', () =>

        expect( () => $createMixin() ).not.to.throw()

      );

      it( 'does return different instances', () =>

        expect( $createMixin() ).not.to.equal( $createMixin() )

      );

      it( 'can be mixed', () =>

        expect( () => $checkMixing( $createMixin() ) ).not.to.throw()

      );

      itIf( 'can be mixed with itself', ARGS.pure === false && ARGS.classes === false && ! ARGS.strings && ! ARGS.slots, ( truthy ) =>

        expect( () => $checkMixing( $createMixin(), $createMixin() ) ).onlyIf( ! truthy ).to.throw()

      );

      it( 'does return object with right properties', () =>

        expect( $createMixin() ).to.have.all.keys( 'mixins' )

      );

    } );

  } );

  describe( '#mixins', () => {

    describe( 'PureRenderMixin', () => {

      contexts( 'with pure = ${ doStringify( value ) }', [ true, false ], ( pure ) => {

        def( 'ARGS', () => _.assign( $ARGS, { pure, purifiedPaths: [ '1' ], dirtiedPaths: [ '2' ] } ) );


        itIf( 'does get included', pure, ( truthy ) => {

          let mixins = $mixin.mixins;

          expect( PureRenderMixinSpy ).to.have.callCount( +truthy );

          if ( truthy ) {

            expect( PureRenderMixinSpy ).to.be.calledWithMatch( { purifiedPaths: [ '1' ], dirtiedPaths: [ '2' ] } );

            expect( $mixin.mixins ).to.include( PureRenderMixinSpy.lastCall.returnValue );

          }

        } );

      } );

    } );

    describe( 'ClassedMixin', () => {

      contexts( 'with classes = ${ doStringify( value ) }', [ undefined, false, {} ], ( classes ) => {

        def( 'ARGS', () => _.assign( $ARGS, { classes } ) );


        itIf( 'does get included', classes !== false, ( truthy ) => {

          let mixins = $mixin.mixins;

          expect( ClassedMixinSpy ).to.have.callCount( +truthy );

          if ( truthy ) {

            expect( ClassedMixinSpy ).to.be.calledWithMatch( { classes: classes === undefined ? {} : classes } );

            expect( $mixin.mixins ).to.include( ClassedMixinSpy.lastCall.returnValue );

          }

        } );

      } );

    } );

    describe( 'StringedMixin', () => {

      contexts( 'with strings = ${ doStringify( value ) }', [ undefined, false, [] ], ( strings ) => {

        def( 'ARGS', () => _.assign( $ARGS, { strings } ) );


        itIf( 'does get included', Boolean( strings ), ( truthy ) => {

          let mixins = $mixin.mixins;

          expect( StringedMixinSpy ).to.have.callCount( +truthy );

          if ( truthy ) {

            expect( StringedMixinSpy ).to.be.calledWithMatch( { strings } );

            expect( $mixin.mixins ).to.include( StringedMixinSpy.lastCall.returnValue );

          }

        } );

      } );

    } );

    describe( 'RenderSlotsMixin', () => {

      contexts( 'with slots = ${ doStringify( value ) }', [ undefined, false, {} ], ( slots ) => {

        def( 'ARGS', () => _.assign( $ARGS, { slots } ) );


        itIf( 'does get included', Boolean( slots ), ( truthy ) => {

          let mixins = $mixin.mixins;

          expect( RenderSlotsMixinSpy ).to.have.callCount( +truthy );

          if ( truthy ) {

            expect( RenderSlotsMixinSpy ).to.be.calledWithMatch( { slots } );

            expect( $mixin.mixins ).to.include( RenderSlotsMixinSpy.lastCall.returnValue );

          }

        } );

      } );

    } );

    describe( 'StateKeyMixin, OmitPropsMixin, RefMixin, DomMixin, CallbackMixin, CacheMixin', () => {

      it( 'does get included', () =>

        expect( $mixin.mixins ).to.include.members( [

          StateKeyMixinSpy.lastCall.returnValue,

          OmitPropsMixinSpy.lastCall.returnValue,

          RefMixinSpy.lastCall.returnValue,

          DomMixinSpy.lastCall.returnValue,

          CallbackMixinSpy.lastCall.returnValue,

          CacheMixinSpy.lastCall.returnValue,

        ] )

      );

    } );

  } );

} );
