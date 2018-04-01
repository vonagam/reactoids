describe( 'mixin.customization.RenderSlots', () => {

  defReactMixin( RenderSlotsMixin, () => ( { slots: { slot: null } } ) );


  describe( '.argTypes', () => {

    it( 'does have right keys', () =>

      expect( $Mixin.argTypes ).to.have.all.keys( 'slots' )

    );

    it( 'does have right defaulted keys', () =>

      expect( $Mixin.defaultArgs ).to.be.empty

    );

    its( ( { value } ) => titleIf( `does approve = ${ doStringify( value[ 0 ] ) }`, value[ 1 ] ), [

      [ {}, false ],

      [ { slots: {} }, true ],

      [ { slots: { b: _.noop } }, true ],

      [ { slots: { a: null } }, true ],

      [ { slots: { c: {} } }, false ],

    ], ( [ args, truthy ] ) =>

      expect( args ).onlyIf( truthy ).to.matchTypes( $Mixin.argTypes )

    );

  } );

  describe( '.constructor', () => {

    contexts( 'with arguments = ${ doStringify( value ) }', [

      { slots: { slot: null } },

      { slots: { slotA: null, slotB: _.noop } },

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

      it( 'cannot be mixed with itself with same slots', () =>

        expect( () => $checkMixing( $createMixin(), $createMixin() ) ).to.throw()

      );

      it( 'can be mixed with itself with different slots', () =>

        expect( () => $checkMixing( $createMixin(), $createMixin( { slots: { different: null } } ) ) ).not.to.throw()

      );

      it( 'does return object with right properties', () => {

        let properties = [ 'propTypes', 'defaultProps' ];

        _.each( $ARGS.slots, ( options, name ) => {

          properties.push( `render${ _.pascalCase( name ) }` );

        } );

        expect( $createMixin() ).to.have.all.keys( properties );

      } );

    } );

  } );

  describe( '#propTypes', () => {

    it( 'does have right keys', () =>

      expect( $mixin.propTypes ).to.have.all.keys( 'slot', 'renderSlot' )

    );

    it( 'does have right defaulted keys', () =>

      expect( $mixin.defaultProps ).to.deep.include( { slot: {}, renderSlot: null } )

    );

    its( ( { value } ) => titleIf( `does approve = ${ doStringify( value[ 0 ] ) }`, value[ 1 ] ), [

      [ {}, true ],

      [ { slot: {} }, true ],

      [ { slot: true }, false ],

      [ { slot: 15 }, false ],

      [ { renderSlot: _.noop }, true ],

      [ { renderSlot: <div /> }, true ],

      [ { renderSlot: null }, true ],

      [ { renderSlot: true }, false ],

    ], ( [ props, truthy ] ) =>

      expect( props ).onlyIf( truthy ).to.matchTypes( $mixin.propTypes )

    );

  } );

  describe( '#renderSlot', () => {

    defFunc( 'renderSlot', () => $component.renderSlot( $slotArgs ) );

    def( 'slotArgs', {} );

    def( 'props', () => ( { slot: $propsProp, renderSlot: $renderProp } ) );


    contexts( 'with props prop as ${ key }', { function: stub().returns( {} ), object: {} }, ( propsProp ) => {

      defSinon( 'propsProp', propsProp );


      contexts( 'with render prop as ${ key }', { function: stub().returns( <div /> ), undefined: undefined, null: null, element: <div /> }, ( renderProp ) => {

        defSinon( 'renderProp', renderProp );


        it( 'does return funced render prop with null as default prop', () =>

          expect( $renderSlot() ).to.equal( _.isFunction( $renderProp ) ? $renderProp.lastCall.returnValue : ( $renderProp || null ) )

        );

        if ( _.isFunction( propsProp ) ) {

          it( 'does call props prop with component', () => {

            expect( () => $renderSlot() ).to.alter( () => $propsProp.callCount, { from: 0, to: 1 } );

            expect( $propsProp ).to.be.calledWithExactly( $component );

          } );

        }

        if ( _.isFunction( renderProp ) ) {

          it( 'does call render prop with component, slot args and slot props', () => {

            expect( () => $renderSlot() ).to.alter( () => $renderProp.callCount, { from: 0, to: 1 } );

            let slotProps = _.isFunction( $propsProp ) ? $propsProp.lastCall.returnValue : $propsProp;

            expect( $renderProp ).to.be.calledWithExactly( $component, $slotArgs, slotProps );

          } );

        }

      } );

    } );

  } );

} );
