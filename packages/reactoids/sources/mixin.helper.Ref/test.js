describe( 'mixin.helper.Ref', () => {

  defReactMixin( RefMixin );


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

      expect( $createMixin() ).to.have.all.keys( 'getInitialMembers', 'refSetter' )

    );

  } );

  describe( '#getInitialMembers', () => {

    it( 'does contain mixin private state', () =>

      expect( $mixin.getInitialMembers() ).to.have.property( '_RefMixin' )

    );

  } );

  describe( '#refSetter', () => {

    defFunc( 'refSetter', ( ...args ) => $component.refSetter( ...args ) );


    it( 'does return function', () =>

      expect( $refSetter( 'a' ) ).to.be.a( 'function' )

    );

    it( 'does return same function for same key', () =>

      expect( $refSetter( 'a' ) ).to.equal( $refSetter( 'a' ) )

    );

    it( 'does return same function for same key even if a second argument is different', () =>

      expect( $refSetter( 'a', _.noop ) ).to.equal( $refSetter( 'a', 'b' ) )

    );

    it( 'does return different functions for different keys', () =>

      expect( $refSetter( 'a' ) ).not.to.equal( $refSetter( 'b' ) )

    );

    describe( 'returned function', () => {

      let callbackSpy = spy();

      defSinon( 'props', { spy: spy() } );

      defSinon( 'callback', callbackSpy );

      def( 'node', {} );


      contexts( 'with args = ${ doStringify( value.args ) }', [

        { args: [ 'a' ], prop: false, callback: false, constant: false },

        { args: [ 'a', 'spy' ], prop: true, callback: false, constant: false },

        { args: [ 'a', 'yps' ], prop: false, callback: false, constant: false },

        { args: [ 'a', callbackSpy ], prop: false, callback: true, constant: false },

        { args: [ 'a', true ], prop: false, callback: false, constant: true },

        { args: [ 'a', { prop: 'spy', callback: callbackSpy, constant: true } ], prop: true, callback: true, constant: true },

      ], ( { args, prop, callback, constant } ) => {

        it( 'does set ref', () => {

          expect( () => $refSetter( ...args )( $node ) ).to.alter( () => $component.refs[ args[ 0 ] ] === $node, { from: false, to: true } );

        } );

        itIf( 'does call prop callback', prop, ( truthy ) => {

          expect( () => $refSetter( ...args )( $node ) ).to.alter( () => $props.spy.callCount, { from: 0, to: +truthy } );

          expect( $props.spy ).onlyIf( truthy ).to.be.calledWithExactly( $node, $component );

        } );

        itIf( 'does call custom callback', callback, ( truthy ) => {

          expect( () => $refSetter( ...args )( $node ) ).to.alter( () => $callback.callCount, { from: 0, to: +truthy } );

          expect( $callback ).onlyIf( truthy ).to.be.calledWithExactly( $node ).and.onlyIf( truthy ).be.calledOn( $component );

        } );

        it( 'does not throw on multiply invocations with same node', () => {

          $refSetter( ...args )( $node );

          expect( () => $refSetter( ...args )( $node ) ).not.to.throw();

        } );

        it( 'does not throw on unmount', () => {

          $refSetter( ...args )( $node );

          expect( () => $refSetter( ...args )( null ) ).not.to.throw();

        } );

        itIf( 'does throw on node change', constant, ( truthy ) => {

          $refSetter( ...args )( $node );

          expect( () => $refSetter( ...args )( {} ) ).onlyIf( truthy ).to.throw();

        } );

      } );

    } );

  } );

} );
