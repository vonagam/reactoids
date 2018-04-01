describe( 'mixin.utility.AjaxHeaders', () => {

  defReactMixin( AjaxHeadersMixin, () => ( { headers: { x: '0' } } ) );


  describe( '.argTypes', () => {

    it( 'does have right keys', () =>

      expect( $Mixin.argTypes ).to.have.all.keys( 'headers', 'filterRequest' )

    );

    it( 'does have right defaulted keys', () =>

      expect( $Mixin.defaultArgs ).to.have.all.keys( 'filterRequest' )

    );

    its( ( { value } ) => titleIf( `does approve = ${ doStringify( value[ 0 ] ) }`, value[ 1 ] ), [

      [ {}, false ],

      [ { headers: {} }, true ],

      [ { headers: { key: 'value' } }, true ],

      [ { headers: { key: 5 } }, false ],

      [ { headers: { key: _.noop } }, true ],

      [ { headers: _.noop }, true ],

      [ { headers: {}, filterRequest: _.noop }, true ],

      [ { headers: {}, filterRequest: 3 }, false ],

    ], ( [ args, truthy ] ) =>

      expect( args ).onlyIf( truthy ).to.matchTypes( $Mixin.argTypes )

    );

  } );

  describe( '.constructor', () => {

    contexts( 'with arguments = ${ doStringify( value ) }', [

      { headers: {}, filterRequest: _.noop },

      { headers: _.noop },

      { headers: { key: _.noop } },

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

        expect( $createMixin() ).to.have.all.keys( 'mixins', 'componentDidMount' )

      );

    } );

  } );

  describe( '#mixins', () => {

    it( 'does contain right mixins', () =>

      expect( $mixin.mixins ).to.have.members( [ EventListenerMixin() ] )

    );

  } );

  describe( '#componentDidMount', () => {

    defSinon( 'addEventListener', spy() );

    def( 'instance', () => ( { addEventListener: $addEventListener } ) );

    defFunc( 'componentDidMount', () => $mixin.componentDidMount.call( $instance ) );


    contexts( 'with arguments = ${ doStringify( value ) }', [

      { headers: { x: '0', y: '1' } },

      { headers: stub().returns( { x: '0', y: '1' } ), filterRequest: stub().callsFake( ( that, options ) => options.crossDomain ) },

      { headers: { x: '0', y: stub().returns( '1' ) }, filterRequest: stub().returns( true ) },

    ], ( ARGS ) => {

      def( 'ARGS', ARGS );

      defSinon( 'headers', ARGS.headers );

      defSinon( 'filterRequest', ARGS.filterRequest );


      it( 'does add event listener', () => {

        expect( () => $componentDidMount() ).to.alter( () => $addEventListener.callCount, { from: 0 } );

        expect( $addEventListener ).to.be.calledOnce.and.be.calledWithMatch( 'AjaxHeadersMixin', { event: 'ajaxSend', callback: sinon.match.func } );

      } );


      contexts( 'with ajax options = ${ doStringify( value ) }', [

        { x: 0, crossDomain: true },

        { x: 0, crossDomain: false },

      ], ( ajaxOptions ) => {

        defSinon( 'setRequestHeader', spy() );

        defFunc( 'sendAjax', () => {

          $componentDidMount();

          $addEventListener.lastCall.args[ 1 ].callback( null, { setRequestHeader: $setRequestHeader }, ajaxOptions );

        } );


        it( 'does work', () => {

          let passed;

          if ( ARGS.filterRequest ) {

            expect( () => $sendAjax() ).to.alter( () => $ARGS.filterRequest.callCount, { from: 0 } );

            expect( $ARGS.filterRequest ).to.be.calledOnce.and.be.calledWithExactly( $instance, ajaxOptions );

            passed = $ARGS.filterRequest.lastCall.returnValue;

          } else {

            $sendAjax();

            passed = ! ajaxOptions.crossDomain;

          }


          let headers = ARGS.headers;

          if ( _.isFunction( headers ) ) {

            if ( passed ) {

              expect( headers ).to.be.calledOnce.and.be.calledWithExactly( $instance, ajaxOptions );

              headers = headers.lastCall.returnValue;

            } else {

              expect( headers ).not.to.be.called;

              return;

            }

          }


          let values = _.mapValues( headers, ( value, key ) => {

            if ( ! _.isFunction( value ) ) return value;

            if ( passed ) {

              expect( value ).to.be.calledOnce.and.be.calledWithExactly( $instance, ajaxOptions );

              return value.lastCall.returnValue;

            } else {

              expect( value ).not.to.be.called;

              return undefined;

            }

          } );


          if ( passed ) {

            expect( $setRequestHeader ).to.have.callCount( _.size( values ) );

            _.each( values, ( value, key ) => {

              expect( $setRequestHeader ).to.be.calledWithExactly( key, value );

            } );

          } else {

            expect( $setRequestHeader ).not.to.be.called;

          }

        } );

      } );

    } )

  } );

} );
