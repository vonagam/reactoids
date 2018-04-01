import proxyquire from 'proxyquire';

proxyquire.noCallThru();


describe( 'mixin.utility.Ajax', () => {

  const simulateLink = spy();

  const AjaxMixin = proxyquire( './index', { '../various.simulateLink': simulateLink } ).default;


  defReactMixin( AjaxMixin );

  defSinon( 'simulateLink', simulateLink );

  defSinon( 'ajaxAbort', spy() );

  defSinon( 'ajaxSend', stub( $, 'ajax' ).callsFake( () => ( { abort: $ajaxAbort } ) ) );

  defFunc( 'getLastSentOptions', () => $ajaxSend.lastCall.args[ 0 ] );


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

      expect( $createMixin() ).to.have.all.keys( 'getInitialState', 'getInitialMembers', 'componentWillUnmount', 'sendAjax', 'isWaitingAjax', 'abortAjax' )

    );

  } );

  describe( '#getInitialState', () => {

    it( 'does provide initial state for right keys', () =>

      expect( $mixin.getInitialState() ).to.deep.include( { ajaxes: {} } )

    );

  } );

  describe( '#getInitialMembers', () => {

    it( 'does contain mixin private state', () =>

      expect( $mixin.getInitialMembers() ).to.have.property( '_AjaxMixin' )

    );

  } );

  describe( '#componentWillUnmount', () => {

    def( 'name', 'check' );

    def( 'options', { key: 'value' } );

    defFunc( 'sendAjax', () => $component.sendAjax( $name, $options ) );

    defFunc( 'completeAjax', () => $getLastSentOptions().complete() );


    contexts( {

      'without sent ajaxes': 0,

      'with pending ajax': 1,

      'with completed ajax': 2,

    }, ( state ) => {

      if ( state > 0 ) {

        beforeEach( 'send ajax', () => $sendAjax() );

      }

      if ( state > 1 ) {

        beforeEach( 'complete ajax', () => $completeAjax() );

      }


      itIf( 'does abort any ajax', state === 1, ( truthy ) =>

        expect( () => $unmount() ).onlyIf( truthy ).to.alter( () => $ajaxAbort.callCount )

      );

    } );

  } );

  describe( '#sendAjax', () => {

    def( 'name', 'check' );

    def( 'options', { key: 'value' } );

    defFunc( 'sendAjax', () => $component.sendAjax( $name, $options ) );


    contexts( 'with options = ${ doStringify( value ) }', [ undefined, null, {}, { key: 'value' } ], ( options ) => {

      let truthy = ! _.isEmpty( options );

      def( 'options', options );


      itIf( 'does send ajax', truthy, ( truthy ) =>

        expect( () => $sendAjax() ).onlyIf( truthy ).to.alter( () => $ajaxSend.callCount, { by: 1 } )

      );

      itIf( 'does change state', truthy, ( truthy ) =>

        expect( () => $sendAjax() ).onlyIf( truthy ).to.alter( () => $mount.state( 'ajaxes' )[ $name ], { from: undefined, to: true } )

      );

    } );

    context( 'with existing pending ajax', () => {

      beforeEach( 'send ajax', () => $sendAjax() );


      contexts( 'with force = ${ doStringify( value ) }', [ undefined, false, true ], ( force ) => {

        def( 'options', () => _.defaults( { force }, $options ) );


        itIf( 'does abort previous ajax', force, ( truthy ) =>

          expect( () => $sendAjax() ).onlyIf( truthy ).to.alter( () => $ajaxAbort.callCount, { by: 1 } )

        );

        itIf( 'does send new ajax', force, ( truthy ) =>

          expect( () => $sendAjax() ).onlyIf( truthy ).to.alter( () => $ajaxSend.callCount, { by: 1 } )

        );

      } );

    } );

    describe( '[callbacks]', () => {

      def( 'location', undefined );

      def( 'xhr', () => ( { getResponseHeader: _.constant( $location ) } ) );

      defSinon( 'callbacks', { success: spy(), error: spy(), complete: spy() } );

      def( 'options', () => _.assign( {}, $options, $callbacks ) );

      beforeEach( 'send ajax', () => $sendAjax() );


      contexts( { 'with success': true, 'with error': false }, ( success ) => {

        def( 'data', success ? {} : undefined );

        def( 'status', success ? 'success' : 'error' );

        if ( success ) {

          defFunc( 'notifyAjax', () => {

            $getLastSentOptions().success( $data, $status, $xhr );

            $getLastSentOptions().complete( $xhr, $status );

          } );

        } else {

          defFunc( 'notifyAjax', () => {

            $getLastSentOptions().error( $xhr, $status );

            $getLastSentOptions().complete( $xhr, $status );

          } );

        }


        itIf( 'does call success callback', success, ( truthy ) =>

          expect( () => $notifyAjax() ).onlyIf( truthy ).to.alter( () => $callbacks.success.callCount, { by: 1 } )

        );

        itIf( 'does call error callback', ! success, ( truthy ) =>

          expect( () => $notifyAjax() ).onlyIf( truthy ).to.alter( () => $callbacks.error.callCount, { by: 1 } )

        );

        it( 'does call complete callback', () =>

          expect( () => $notifyAjax() ).to.alter( () => $callbacks.complete.callCount, { by: 1 } )

        );

        it( 'does change state', () =>

          expect( () => $notifyAjax() ).to.alter( () => $mount.state( 'ajaxes' )[ $name ], { from: true, to: undefined } )

        );

      } );

    } );

    itVariations( 'it redirects if location is string and redirect option returns truthy', {

      location: [ undefined, '', 'neverland' ],

      redirectValue: [ undefined, false, true, 'neverland' ],

      redirectFunced: [ true, false ],

      callback: [ 'success', 'error' ],

    }, {

      beforeEach() {

        $simulateLink.resetHistory();

      },

    }, ( { location, redirectValue, redirectFunced, callback }, { index } ) => {

      let redirect = redirectFunced ? spy( () => redirectValue ) : redirectValue;

      let truthy = _.isString( redirectValue ) || ( redirectValue && _.isString( location ) );

      let data = callback == 'success' ? {} : undefined;

      let status = callback;

      let xhr = { getResponseHeader: _.constant( location ) };

      expect( () => $component.sendAjax( index, { redirect } ) ).not.to.alter( () => $simulateLink.callCount );

      let options = $getLastSentOptions();

      expect( () => {

        if ( callback == 'success' ) {

          $getLastSentOptions().success( data, status, xhr );

        } else {

          $getLastSentOptions().error( xhr, status );

        }

      } ).onlyIf( truthy ).to.alter( () => $simulateLink.callCount, { by: 1 } );

      if ( redirectFunced ) expect( redirect ).to.be.calledWithExactly( location, xhr, status, data );

    } );

  } );

  describe( '#isWaitingAjax', () => {

    def( 'name', 'check' );

    defFunc( 'sendAjax', () => $component.sendAjax( $name, { key: 'value' } ) );

    defFunc( 'completeAjax', () => $getLastSentOptions().complete() );

    defFunc( 'isWaitingNamedAjax', () => $component.isWaitingAjax( $name ) );

    defFunc( 'isWaitingAnyAjax', () => $component.isWaitingAjax() );


    contexts( { 'without sent ajaxes': false, 'with completed ajax': true }, ( completed ) => {

      if ( completed ) {

        beforeEach( 'send ajax', () => $sendAjax() );

        beforeEach( 'complete ajax', () => $completeAjax() );

      }


      its( 'does not return true ${ key }', { 'with name': true, 'without name': false }, ( name ) =>

        expect( name ? $isWaitingNamedAjax() : $isWaitingAnyAjax() ).to.be.false

      );

    } );

    context( 'with pending ajax', () => {

      beforeEach( 'send ajax', () => $sendAjax() );


      contexts( { 'with a name of pending ajax': true, 'with an irrelevant name': false }, ( matching ) => {

        if ( ! matching ) {

          defFunc( 'isWaitingNamedAjax', () => $component.isWaitingAjax( `not${ $name }` ) );

        }


        itIf( 'does return true', matching, ( truthy ) =>

          expect( $isWaitingNamedAjax() ).onlyIf( truthy ).to.be.true

        );

      } );

      it( 'does return true without name', () =>

        expect( $isWaitingAnyAjax() ).to.be.true

      );

    } );

  } );

  describe( '#abortAjax', () => {

    def( 'name', 'check' );

    defFunc( 'sendAjax', () => $component.sendAjax( $name, { key: 'value' } ) );

    defFunc( 'completeAjax', () => $getLastSentOptions().complete() );

    defFunc( 'abortAjax', () => $component.abortAjax( $name ) );


    contexts( { 'without sent ajaxes': false, 'with completed ajax': true }, ( completed ) => {

      if ( completed ) {

        beforeEach( 'send ajax', () => $sendAjax() );

        beforeEach( 'complete ajax', () => $completeAjax() );

      }


      it( 'does not abort any ajax', () =>

        expect( () => $abortAjax() ).not.to.alter( () => $ajaxAbort.callCount )

      );

      it( 'does not change state', () =>

        expect( () => $abortAjax() ).not.to.alter( () => $mount.state() )

      );

    } );

    context( 'with pending ajax', () => {

      beforeEach( 'send ajax', () => $sendAjax() );


      contexts( { 'with a name of pending ajax': true, 'with an irrelevant name': false }, ( matching ) => {

        if ( ! matching ) {

          defFunc( 'abortAjax', () => $component.abortAjax( `not${ $name }` ) );

        }


        itIf( 'does abort ajax', matching, ( truthy ) =>

          expect( () => $abortAjax() ).onlyIf( truthy ).to.alter( () => $ajaxAbort.callCount, { by: 1 } )

        );

        itIf( 'does change state', matching, ( truthy ) =>

          expect( () => $abortAjax() ).onlyIf( truthy ).to.alter( () => $mount.state( 'ajaxes' )[ $name ], { from: true, to: undefined } )

        );

      } );

    } );

  } );

} );
