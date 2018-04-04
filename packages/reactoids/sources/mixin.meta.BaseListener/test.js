defReactMixin( BaseListenerMixin, () => ( { plural: false, toggleListener: $toggle, initListener: $init } ) );

defSinon( 'toggle', spy() );

defSinon( 'init', stub().returnsArg( 1 ) );


describe( '.argTypes', () => {

  it( 'does have right keys', () =>

    expect( $Mixin.argTypes ).to.have.all.keys( 'name', 'plural', 'initListener', 'toggleListener' )

  );

  it( 'does have right defaulted keys', () =>

    expect( $Mixin.defaultArgs ).to.have.all.keys( 'name', 'initListener' )

  );

  its( ( { value } ) => titleIf( `does approve = ${ doStringify( value[ 0 ] ) }`, value[ 1 ] ), [

    [ {}, false ],

    [ { toggleListener: _.noop, plural: true }, true ],

    [ { toggleListener: _.noop, plural: 42 }, false ],

    [ { toggleListener: true, plural: true }, false ],

    [ { toggleListener: _.noop, plural: true, name: 'asd' }, true ],

    [ { toggleListener: _.noop, plural: true, name: 123 }, false ],

    [ { toggleListener: _.noop, plural: true, initListener: _.noop }, true ],

    [ { toggleListener: _.noop, plural: true, initListener: '123' }, false ],

  ], ( [ args, truthy ] ) =>

    expect( args ).onlyIf( truthy ).to.matchTypes( $Mixin.argTypes )

  );

} );

describe( '.constructor', () => {

  contexts( 'with valid arguments = ${ doStringify( value ) }', [

    { toggleListener: _.noop, plural: false },

    { toggleListener: _.noop, plural: true, name: 'asd' },

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

    it( 'does return object with right properties', () => {

      let properties = [ 'getInitialMembers', 'componentWillUnmount' ];

      _.each( [ 'add', 'toggle', 'remove' ], ( method ) => {

        properties.push( `${ method }${ _.pascalCase( $ARGS.name ) }Listener` );

      } );

      properties.push( `get${ _.pascalCase( $ARGS.name ) }ListenerState` )

      expect( $createMixin() ).to.have.all.keys( properties );

    } );

  } );

} );

describe( '#getInitialMembers', () => {

  it( 'does contain mixin private state', () =>

    expect( $mixin.getInitialMembers() ).to.have.property( '_BaseListenerMixin' )

  );

} );

describe( '#componentWillUnmount', () => {

  it( 'does not break anything', () =>

    expect( () => $mount.unmount() ).not.to.throw()

  );


  contexts( 'with plural = ${ value }', [ false, true ], ( plural ) => {

    def( 'ARGS', () => _.defaults( { plural }, $ARGS ) );


    contexts( ( { value } ) => value ? 'with remaining' : 'without remaining', [ false, true ], ( remaining ) => {

      def( 'remaining', () => {

        if ( plural ) {

          _.times( 4, ( index ) => $component.addListener( `key${ index }`, { 'foo': `bar${ index }` } ) );

          $component.removeListener( 'key2' );

          $component.toggleListener( 'key1', false );

          if ( ! remaining ) {

            $component.removeListener( 'key0' );

            $component.toggleListener( 'key3', false );

            return 0;

          }

          return 2;

        } else {

          $component.addListener( { foo: 'bar0' } );

          if ( ! remaining ) {

            $component.toggleListener( false );

            return 0;

          }

          return 1;

        }

      } );


      itIf( 'does call toggle off', remaining, () => {

        $toggle.resetHistory();

        expect( () => $mount.unmount() ).to.alter( () => $toggle.callCount, { by: $remaining } );

        _.times( $remaining, ( index ) => {

          expect( $toggle ).to.be.calledWithMatch(

            sinon.match.same( $component ),

            sinon.match( { 'foo': `bar${ index }` } ),

            sinon.match.same( false ),

            sinon.match.same( plural ? `key${ index }` : undefined ),

          );

        } );

      } );

    } );

  } );

} );

describe( '#addListener', () => {

  defFunc( 'addListener', ( ...args ) => $component.addListener( ..._.slice( args, $ARGS.plural ? 0 : 1 ) ) );

  def( 'key', () => $ARGS.plural ? 'guess' : undefined );

  def( 'data', {} );


  contexts( 'with plural = ${ doStringify( value ) }', [ false, true ], ( plural ) => {

    def( 'ARGS', () => _.defaults( { plural }, $ARGS ) );

    contexts( 'with start = ${ doStringify( value ) }', [ undefined, false, true ], ( start ) => {

      def( 'start', start );


      it( 'does call init with component, data and key', () => {

        expect( () => $addListener( $key, $data, $start ) ).to.alter( () => $init.callCount, { by: 1 } );

        expect( $init ).to.be.calledWithExactly( $component, $data, $key );

      } );

      itIf( 'does call toggle with component, true, data and key', start !== false, ( truthy ) => {

        expect( () => $addListener( $key, $data, $start ) ).onlyIf( truthy ).to.alter( () => $toggle.callCount, { by: 1 } );

        expect( $toggle ).onlyIf( truthy ).to.be.calledWithExactly( $component, $data, true, $key );

      } );

      if ( plural ) {

        it( 'does throw on key collisions', () => {

          $addListener( $key, $data, $start );

          expect( () => $addListener( $key, $data, $start ) ).to.throw()

        } );

      }

    } );

  } );

} );

describe( '#getListenerState', () => {

  defFunc( 'getListenerState', ( ...args ) => $component.getListenerState( ..._.slice( args, $ARGS.plural ? 0 : 1 ) ) );

  defFunc( 'addListener', ( ...args ) => $component.addListener( ..._.slice( args, $ARGS.plural ? 0 : 1 ) ) );

  def( 'key', () => $ARGS.plural ? 'corresponding' : undefined );


  contexts( 'with plural = ${ doStringify( value ) }', [ false, true ], ( plural ) => {

    def( 'ARGS', () => _.defaults( { plural }, $ARGS ) );


    context( 'without corresponding listener', () => {

      it( 'does return undefined', () =>

        expect( $getListenerState( $key ) ).to.be.undefined

      );

    } );

    contexts( 'with corresponding listener in state = ${ doStringify( value ) }', [ false, true ], ( state ) => {

      beforeEach( () => {

        $addListener( $key, {}, state );

      } );


      it( `does return ${ state }`, () =>

        expect( $getListenerState( $key ) ).to.equal( state )

      );

    } );

  } );

} );

describe( '#toggleListener', () => {

  defFunc( 'toggleListener', ( ...args ) => $component.toggleListener( ..._.slice( args, $ARGS.plural ? 0 : 1 ) ) );

  defFunc( 'addListener', ( ...args ) => $component.addListener( ..._.slice( args, $ARGS.plural ? 0 : 1 ) ) );

  def( 'key', () => $ARGS.plural ? 'corresponding' : undefined );

  def( 'data', {} );


  contexts( 'with plural = ${ doStringify( value ) }', [ false, true ], ( plural ) => {

    def( 'ARGS', () => _.defaults( { plural }, $ARGS ) );

    contexts( 'with bool = ${ doStringify( value ) }', [ false, true ], ( bool ) => {

      def( 'bool', bool );


      context( 'without corresponding listener', () => {

        it( 'does throw and does not call toggle', () => {

          expect( () => $toggleListener( $key, $bool ) ).to.throw()

          expect( $toggle ).not.to.be.called;

        } );

      } );

      contexts( 'with corresponding listener in state = ${ doStringify( value ) }', [ false, true ], ( state ) => {

        beforeEach( () => {

          $addListener( $key, $data, state );

          $toggle.resetHistory();

          $init.resetHistory();

        } );


        it( 'does not throw', () =>

          expect( () => $toggleListener( $key, $bool ) ).not.to.throw()

        );

        itIf( 'does call toggle with component, bool, data and key', state !== bool, ( truthy ) => {

          expect( () => $toggleListener( $key, $bool ) ).to.alter( () => $toggle.callCount, { from: 0, to: +truthy } );

          expect( $toggle ).onlyIf( truthy ).to.be.calledWithExactly( $component, $data, $bool, $key );

        } );

      } );

    } );

  } );

} );

describe( '#removeListener', () => {

  defFunc( 'removeListener', ( ...args ) => $component.removeListener( ..._.slice( args, $ARGS.plural ? 0 : 1 ) ) );

  defFunc( 'addListener', ( ...args ) => $component.addListener( ..._.slice( args, $ARGS.plural ? 0 : 1 ) ) );

  defFunc( 'getListenerState', ( ...args ) => $component.getListenerState( ..._.slice( args, $ARGS.plural ? 0 : 1 ) ) );

  def( 'key', () => $ARGS.plural ? 'corresponding' : undefined );

  def( 'data', {} );


  contexts( 'with plural = ${ doStringify( value ) }', [ false, true ], ( plural ) => {

    def( 'ARGS', () => _.defaults( { plural }, $ARGS ) );


    context( 'without corresponding listener', () => {

      it( 'does throw and does not call toggle', () => {

        expect( () => $removeListener( $key ) ).to.throw()

        expect( $toggle ).not.to.be.called;

      } );

    } );

    contexts( 'with corresponding listener in state = ${ doStringify( value ) }', [ false, true ], ( state ) => {

      beforeEach( () => {

        $addListener( $key, $data, state );

        $toggle.resetHistory();

        $init.resetHistory();

      } );


      it( 'does not throw', () =>

        expect( () => $removeListener( $key ) ).not.to.throw()

      );

      itIf( 'does call toggle with component, false, data and key', state !== false, ( truthy ) => {

        expect( () => $removeListener( $key ) ).to.alter( () => $toggle.callCount, { from: 0, to: +truthy } );

        expect( $toggle ).onlyIf( truthy ).to.be.calledWithExactly( $component, $data, false, $key );

      } );

      it( 'does change getListenerState return value to undefined', () =>

        expect( () => $removeListener( $key ) ).to.alter( () => $getListenerState( $key ), { from: state, to: undefined } )

      );

    } );

  } );

} );
