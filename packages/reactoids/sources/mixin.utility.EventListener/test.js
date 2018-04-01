import proxyquire from 'proxyquire';

proxyquire.noCallThru();


describe( 'mixin.utility.EventListener', () => {

  const BaseListenerMixinSpy = defMixinSpy( BaseListenerMixin, true );

  const EventListenerMixin = proxyquire( './index', { '../mixin.meta.BaseListener': BaseListenerMixinSpy } ).default;

  defReactMixin( EventListenerMixin );


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

      expect( $createMixin() ).to.have.all.keys( 'mixins' )

    );

  } );

  describe( '#mixins', () => {

    describe( 'BaseListenerMixin', () => {

      describe( 'name:', () => {

        it( 'is "event"', () =>

          expect( $BaseListenerMixinArgs ).to.include( { name: "event" } )

        );

      } );

      describe( 'plural:', () => {

        it( 'is true', () =>

          expect( $BaseListenerMixinArgs ).to.include( { plural: true } )

        );

      } );

      describe( 'initListener:', () => {

        defFunc( 'initListener', ( data ) => $BaseListenerMixinArgs.initListener( undefined, data ) );


        contexts( 'with invalid data = ${ doStringify( value ) }', [

          {},

          { event: 'a' },

          { callback: _.noop },

        ], ( data ) => {

          it( 'does throw', () =>

            expect( () => $initListener( data ) ).to.throw()

          );

        } );

        contexts( 'with valid data = ${ doStringify( value ) }', [

          { event: 'a', callback: _.noop },

          { event: 'a', callback: _.noop, jquery: true },

          { event: 'a', callback: _.noop, target: window, jquery: false },

          { event: 'a', callback: _.noop, target: {}, jquery: false },

          { event: 'a', callback: _.noop, target: document, selector: 'a[href]' },

        ], ( data ) => {

          itIf( 'does set target to document', data.target === document || ! data.target, ( truthy ) => {

            let target = expect( $initListener( data ) ).to.have.property( 'target' );

            if ( data.jquery !== false ) {

              target.that.onlyIf( truthy ).to.have.include( { 0: document } );

            } else {

              target.that.onlyIf( truthy ).to.equal( document );

            }

          } );

          itIf( 'does set jquery to true', data.jquery !== false, ( truthy ) =>

            expect( $initListener( data ) ).to.have.property( 'jquery' ).that.onlyIf( truthy ).to.be.true

          );

          itIf( 'does wrap target in jquery', data.jquery !== false, ( truthy ) =>

            expect( $initListener( data ) ).to.have.property( 'target' ).that.onlyIf( truthy ).is.instanceof( $ )

          );

          itIf( 'does set selector to null', ! data.selector, ( truthy ) =>

            expect( $initListener( data ) ).to.have.property( 'selector' ).that.onlyIf( truthy ).to.be.null

          );

        } );

      } );

      describe( 'toggleListener:', () => {

        defSinon( 'target', {

          addEventListener: spy(),

          removeEventListener: spy(),

        } );

        defSinon( 'document', () => ( {

          addEventListener: stub( document, 'addEventListener' ),

          removeEventListener: stub( document, 'removeEventListener' ),

        } ) );


        contexts( 'with data = ${ doStringify( value.data ) } and bool = ${ doStringify( value.bool ) }', [

          { data: { event: 'a', callback: _.noop }, bool: true },

          { data: { event: 'b', callback: _.noop, jquery: true }, bool: false },

          { data: { event: 'c', callback: _.noop, target: window, jquery: false }, bool: true },

          { data: { event: 'd', callback: _.noop, target: { addEventListener: _.noop, removeEventListener: _.noop }, jquery: false }, bool: false },

          { data: { event: 'e', callback: _.noop, target: document, selector: 'a[href]' }, bool: true },

          { data: { event: 'f', callback: _.noop, target: document, selector: 'a[href]' }, bool: false },

        ], ( { data, bool } ) => {

          def( 'initedData', () => $BaseListenerMixinArgs.initListener( undefined, data ) );

          defFunc( 'toggleListener', () => $BaseListenerMixinArgs.toggleListener( undefined, $initedData, bool ) );

          defSinon( 'target', () => ( {

            add: stub( $initedData.target, $initedData.jquery ? 'on' : 'addEventListener' ),

            remove: stub( $initedData.target, $initedData.jquery ? 'off' : 'removeEventListener' ),

          } ) );


          if ( bool ) {

            it( 'does add listener', () => {

              expect( () => $toggleListener() ).to.alter( () => $target.add.callCount, { from: 0, to: 1 } );

              if ( data.jquery !== false ) {

                expect( $target.add ).to.be.calledWithExactly( $initedData.event, $initedData.selector, $initedData.callback );

              } else {

                expect( $target.add ).to.be.calledWithExactly( $initedData.event, $initedData.callback );

              }

              expect( $target.remove ).not.to.be.called;

            } );

          } else {

            it( 'does remove listener', () => {

              expect( () => $toggleListener() ).to.alter( () => $target.remove.callCount, { from: 0, to: 1 } );

              if ( data.jquery !== false ) {

                expect( $target.remove ).to.be.calledWithExactly( $initedData.event, $initedData.selector, $initedData.callback );

              } else {

                expect( $target.remove ).to.be.calledWithExactly( $initedData.event, $initedData.callback );

              }

              expect( $target.add ).not.to.be.called;

            } );

          }

        } );

      } );

    } );

  } );

} );
