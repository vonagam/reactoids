describe( 'mixin.helper.Dom', () => {

  defReactMixin( DomMixin );


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

      expect( $createMixin() ).to.have.all.keys( 'dom' )

    );

  } );

  describe( '#dom', () => {

    defFunc( 'dom', ( ...args ) => $component.dom( ...args ) );

    defSinon( 'findDOMNode', () => stub( ReactDOM, 'findDOMNode' ).callsFake( () => _.random( 0, 1, true ) ) );

    def( 'additionals', {

      render() {

        return <div><span ref={ ( insider ) => { this.insider = insider } } /></div>;

      },

    } );


    its( 'does search ${ value.type } with ${ doStringify( value.input ) }', [

      { type: 'itself', input: [], search: () => $component },

      { type: 'itself', input: [ undefined ], search: () => $component },

      { type: 'itself', input: [ '' ], search: () => $component },

      { type: 'ref', input: [ 'insider' ], search: () => $component.refs[ 'insider' ] },

      { type: 'ref', input: [ 'outsider' ], search: () => undefined },

      { type: 'passed in argument', input: [ 42 ], search: () => 42 },

    ], ( { input, search } ) => {

      expect( $dom( ...input ) ).to.equal( $findDOMNode.lastCall.returnValue );

      expect( $findDOMNode ).to.be.calledOnce.and.be.calledWithExactly( search() );

    } );

  } );

} );
