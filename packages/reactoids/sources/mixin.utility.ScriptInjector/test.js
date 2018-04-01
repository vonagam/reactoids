describe( 'mixin.utility.ScriptInjector', () => {

  defReactMixin( ScriptInjectorMixin );

  defSinon( 'document', () => ( {

    querySelector: stub( document, 'querySelector' ),

    createElement: stub( document, 'createElement' ).callsFake( () => ( {} ) ),

    appendScript: stub( document.head, 'appendChild' ),

  } ) );


  describe( '.argTypes', () => {

    it( 'does have right keys', () =>

      expect( $Mixin.argTypes ).to.have.all.keys( 'scripts', 'filterScript', 'decorateScript', 'callback' )

    );

    it( 'does have right defaulted keys', () =>

      expect( $Mixin.defaultArgs ).to.have.all.keys( 'filterScript', 'decorateScript', 'callback' )

    );

    its( ( { value } ) => titleIf( `does approve = ${ doStringify( value[ 0 ] ) }`, value[ 1 ] ), [

      [ {}, false ],

      [ { scripts: [ 'a' ] }, true ],

      [ { scripts: [ 1 ] }, false ],

      [ { scripts: _.constant( [ 'a', 'b' ] ), filterScript: _.noop, decorateScript: _.noop, callback: _.noop }, true ],

    ], ( [ args, truthy ] ) =>

      expect( args ).onlyIf( truthy ).to.matchTypes( $Mixin.argTypes )

    );

  } );

  describe( '.constructor', () => {

    contexts( 'with valid arguments = ${ doStringify( value ) }', [

      { scripts: [ 'a' ] },

      { scripts: _.constant( [ 'a', 'b' ] ), filterScript: _.noop, decorateScript: _.noop, callback: _.noop },

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

        expect( $createMixin() ).to.have.all.keys( 'componentDidMount' )

      );

    } );

  } );

  describe( '#componentDidMount', () => {

    defFunc( 'componentDidMount', ( instance ) => $mixin.componentDidMount.call( instance ) );

    contexts( 'with ${ doStringify( value ) }', getVariations( {

      scripts: [ [ 'a', 'b' ], stub().returns( [ 'a', 'b' ] ) ],

      filterScript: [ false, true, stub().returns( false ), stub().returns( true ) ],

      decorateScript: [ undefined, spy() ],

      callback: [ undefined, spy() ],

    } ), ( variation ) => {

      def( 'ARGS', _.isBoolean( variation.filterScript ) ? _.omit( variation, 'filterScript' ) : variation );

      defSinon( 'resets', variation );

      if ( _.isBoolean( variation.filterScript ) ) {

        beforeEach( 'set querySelector', () => $document.querySelector.returns( variation.filterScript ) );

      }


      it( 'does work', () => {

        let instance = {};

        $componentDidMount( instance );


        let scripts;

        if ( _.isFunction( variation.scripts ) ) {

          expect( variation.scripts ).to.be.calledOnce.and.be.calledWithExactly( instance );

          scripts = variation.scripts.lastCall.returnValue;

        } else {

          scripts = variation.scripts;

        }


        let filtered;

        if ( _.isBoolean( variation.filterScript ) ) {

          expect( $document.querySelector ).to.have.callCount( scripts.length );

          _.each( scripts, ( script ) => {

            expect( $document.querySelector ).to.be.calledWithExactly( `script[ src=\"${ script }\" ]` );

          } );

          filtered = $document.querySelector.lastCall.returnValue ? [] : scripts;

        } else {

          expect( $document.querySelector ).not.to.be.called;

          expect( variation.filterScript ).to.have.callCount( scripts.length );

          _.each( scripts, ( script ) => {

            expect( variation.filterScript ).to.be.calledWithExactly( instance, script );

          } );

          filtered = variation.filterScript.lastCall.returnValue ? scripts : [];

        }


        expect( $document.createElement ).to.have.callCount( filtered.length );

        if ( filtered.length > 0 ) {

          expect( $document.createElement ).to.be.always.calledWithExactly( 'script' );

        }

        let nodes = _.times( filtered.length, ( index ) => $document.createElement.getCall( index ).returnValue );

        _.each( nodes, ( node ) => {

          expect( node ).to.have.property( 'src' ).that.is.a( 'string' );

          expect( node ).to.have.property( 'onload' ).that.is.a( 'function' );

        } );


        if ( variation.decorateScript ) {

          expect( variation.decorateScript ).to.have.callCount( nodes.length );

          _.each( nodes, ( node ) => {

            expect( variation.decorateScript ).to.be.calledWithExactly( instance, node );

          } );

        }


        expect( $document.appendScript ).to.have.callCount( filtered.length );

        _.each( nodes, ( node, index ) => {

          expect( $document.appendScript ).to.be.calledWithExactly( node );

        } );


        if ( variation.callback ) {

          if ( nodes.length === 0 ) {

            expect( variation.callback ).to.be.calledOnce.and.be.calledWithExactly( instance );

          } else {

            expect( variation.callback ).not.to.be.called;

            _.each( nodes, ( node, index ) => {

              expect( () => node.onload() ).onlyIf( index === nodes.length - 1 ).to.alter( () => variation.callback.callCount );

            } );

            expect( variation.callback ).to.be.calledOnce.and.be.calledWithExactly( instance );

          }

        } else {

          expect( () => _.each( nodes, ( node ) => node.onload() ) ).not.to.throw();

        }

      } );

    } );

  } );

} );
