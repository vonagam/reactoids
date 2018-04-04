defReactMixin( BaseKeyMixin, () => ( {

  name: '',

  get: $accessors.get,

  set: $accessors.set,

} ) );

def( 'accessors', () => ( {

  get: sinon.spy( () => $store.value ),

  set: sinon.spy( ( that, value, callback ) => { $store.value == value; callback(); } ),

} ) );

def( 'store', () => ( { value: $value } ) );

def( 'value', { x: { y: 1 }, z: 2 } );


describe( '.argTypes', () => {

  it( 'does have right keys', () =>

    expect( $Mixin.argTypes ).to.have.all.keys( 'name', 'get', 'set' )

  );

  it( 'does have right defaulted keys', () =>

    expect( $Mixin.defaultArgs ).to.have.all.keys( 'name' )

  );

  its( ( { value } ) => titleIf( `does approve = ${ doStringify( value[ 0 ] ) }`, value[ 1 ] ), [

    [ { get: _.noop, set: _.noop }, true ],

    [ { name: '', get: _.noop, set: _.noop }, true ],

    [ { name: '', set: _.noop }, false ],

    [ { name: '', get: _.noop }, false ],

  ], ( [ args, truthy ] ) =>

    expect( args ).onlyIf( truthy ).to.matchTypes( $Mixin.argTypes )

  );

} );

describe( '.constructor', () => {

  contexts( 'with arguments = ${ doStringify( value ) }', [

    { get: _.noop, set: _.noop },

    { name: 'check', get: _.noop, set: _.noop },

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

      let properties = [ 'getInitialMembers', 'componentDidMount', 'componentWillUpdate', 'componentDidUpdate' ];

      let name = _.pascalCase( $ARGS.name || '' );

      _.each( [ 'get', 'update', 'set', 'toggle', 'increase', 'default', 'unset' ], ( prefix ) => {

        _.each( [ 'Key', 'Keys' ], ( suffix ) => properties.push( `${ prefix }${ name }${ suffix }` ) );

      } );

      expect( $createMixin() ).to.have.all.keys( properties );

    } );

  } );

} );

describe( '#getInitialMembers', () => {

  it( 'does contain mixin private state', () =>

    expect( $mixin.getInitialMembers() ).to.have.property( '_KeyMixin' )

  );

} );

describe( '[getters]', () => {

  const describeGetter = ( method, checks ) => {

    describe( `#${ method }`, () => {

      its( 'does return ${ doStringify( value.output ) } for ${ doStringify( value.input ) }', checks, ( { input, output } ) =>

        expect( $component[ method ].apply( $component, input ) ).to.eql( output )

      );

    } );

  };


  describeGetter( 'getKey', [

    { input: [], output: { x: { y: 1 }, z: 2 } },

    { input: [ undefined, 'default' ], output: { x: { y: 1 }, z: 2 } },

    { input: [ '' ], output: { x: { y: 1 }, z: 2 } },

    { input: [ '', 'default' ], output: { x: { y: 1 }, z: 2 } },

    { input: [ 'z' ], output: 2 },

    { input: [ 'z', 'default' ], output: 2 },

    { input: [ 'w' ], output: undefined },

    { input: [ 'w', 'default' ], output: 'default' },

    { input: [ 'x.y' ], output: 1 },

  ] );

  describeGetter( 'getKeys', [

    { input: [], output: {} },

    { input: [ [ '' ] ], output: { '': { x: { y: 1 }, z: 2 } } },

    { input: [ [ 'z' ] ], output: { z: 2 } },

    { input: [ [ 'z' ], 'default' ], output: { z: 2 } },

    { input: [ [ 'w' ] ], output: { w: undefined } },

    { input: [ [ 'w' ], 'default' ], output: { w: 'default' } },

    { input: [ [ 'x.y' ], 'default' ], output: { 'x.y': 1 } },

  ] );

} );

describe( '[setters]', () => {

  const describeSetter = ( method, checks ) => {

    describe( `#${ method }`, () => {

      its( 'does set ${ doStringify( value.output ) } for ${ doStringify( value.input ) }', checks, ( { input, output, blank = false } ) => {

        let callback = sinon.spy();

        input = _.concat( input, callback );

        $component[ method ].apply( $component, input );

        if ( blank ) {

          expect( $accessors.set ).not.to.be.calledOnce;

        } else {

          expect( $accessors.set ).to.be.calledOnce.and.be.calledWithMatch(

            sinon.match.same( $component ),

            sinon.match( output ),

            sinon.match.same( callback ),

          );

        }

        expect( callback ).to.be.calledOnce;

      } );

    } );

  };


  describeSetter( 'updateKey', [

    { input: [ '', ( value ) => value.x ], output: { y: 1 } },

    { input: [ 'z', ( value ) => value + 1 ], output: { x: { y: 1 }, z: 3 } },

    { input: [ 'z', ( value ) => 2 ], output: { x: { y: 1 }, z: 2 }, blank: true },

    { input: [ 'x.y', () => 42 ], output: { x: { y: 42 }, z: 2 } },

    { input: [ 'x.x.x', () => 666 ], output: { x: { y: 1, x: { x: 666 } }, z: 2 } },

  ] );

  describeSetter( 'updateKeys', [

    { input: [ { '': ( value ) => value.x } ], output: { y: 1 } },

    { input: [ { 'z': ( value ) => value + 1 } ], output: { x: { y: 1 }, z: 3 } },

    { input: [ { 'z': ( value ) => 2 } ], output: { x: { y: 1 }, z: 2 }, blank: true },

    { input: [ { 'x.y': () => 42 } ], output: { x: { y: 42 }, z: 2 } },

    { input: [ { 'x.x.x': () => 666 } ], output: { x: { y: 1, x: { x: 666 } }, z: 2 } },

    { input: [ { 'x.x.x': () => 666, 'z': ( value ) => value + 1 } ], output: { x: { y: 1, x: { x: 666 } }, z: 3 } },

  ] );

  describeSetter( 'setKey', [

    { input: [ '', { y: 1 } ], output: { y: 1 } },

    { input: [ 'z', 3 ], output: { x: { y: 1 }, z: 3 } },

    { input: [ 'z', 2 ], output: { x: { y: 1 }, z: 2 }, blank: true },

    { input: [ 'x.y', 42 ], output: { x: { y: 42 }, z: 2 } },

    { input: [ 'x.x.x', 666 ], output: { x: { y: 1, x: { x: 666 } }, z: 2 } },

  ] );

  describeSetter( 'setKeys', [

    { input: [ { '': { y: 1 } } ], output: { y: 1 } },

    { input: [ { 'z': 3 } ], output: { x: { y: 1 }, z: 3 } },

    { input: [ { 'z': 2 } ], output: { x: { y: 1 }, z: 2 }, blank: true },

    { input: [ { 'x.y': 42 } ], output: { x: { y: 42 }, z: 2 } },

    { input: [ { 'x.x.x': 666 } ], output: { x: { y: 1, x: { x: 666 } }, z: 2 } },

    { input: [ { 'x.x.x': 666, 'z': 3 } ], output: { x: { y: 1, x: { x: 666 } }, z: 3 } },

  ] );

  describeSetter( 'toggleKey', [

    { input: [ '' ], output: false },

    { input: [ 'z' ], output: { x: { y: 1 }, z: false } },

    { input: [ 'x.y' ], output: { x: { y: false }, z: 2 } },

    { input: [ 'x.x.x' ], output: { x: { y: 1, x: { x: true } }, z: 2 } },

  ] );

  describeSetter( 'toggleKeys', [

    { input: [ [ '' ] ], output: false },

    { input: [ [ 'z' ] ], output: { x: { y: 1 }, z: false } },

    { input: [ [ 'x.y' ] ], output: { x: { y: false }, z: 2 } },

    { input: [ [ 'x.x.x' ] ], output: { x: { y: 1, x: { x: true } }, z: 2 } },

    { input: [ [ 'x.x.x', 'z' ] ], output: { x: { y: 1, x: { x: true } }, z: false } },

  ] );

  describeSetter( 'increaseKey', [

    { input: [ 'z', 1 ], output: { x: { y: 1 }, z: 3 } },

    { input: [ 'z', 0 ], output: { x: { y: 1 }, z: 3 }, blank: true },

    { input: [ 'x.y', 41 ], output: { x: { y: 42 }, z: 2 } },

    { input: [ 'x.x.x', 666 ], output: { x: { y: 1, x: { x: 666 } }, z: 2 } },

  ] );

  describeSetter( 'increaseKeys', [

    { input: [ { 'z': 1 } ], output: { x: { y: 1 }, z: 3 } },

    { input: [ { 'z': 0 } ], output: { x: { y: 1 }, z: 3 }, blank: true },

    { input: [ { 'x.y': 41 } ], output: { x: { y: 42 }, z: 2 } },

    { input: [ { 'x.x.x': 666 } ], output: { x: { y: 1, x: { x: 666 } }, z: 2 } },

    { input: [ { 'x.x.x': 666, 'z': 1 } ], output: { x: { y: 1, x: { x: 666 } }, z: 3 } },

  ] );

  describeSetter( 'defaultKey', [

    { input: [ '', { y: 1 } ], output: { x: { y: 1 }, z: 3 }, blank: true },

    { input: [ 'z', 3 ], output: { x: { y: 1 }, z: 2 }, blank: true },

    { input: [ 'x.y', 42 ], output: { x: { y: 42 }, z: 2 }, blank: true },

    { input: [ 'x.x.x', 666 ], output: { x: { y: 1, x: { x: 666 } }, z: 2 } },

  ] );

  describeSetter( 'defaultKeys', [

    { input: [ { '': { y: 1 } } ], output: { x: { y: 1 }, z: 3 }, blank: true },

    { input: [ { 'z': 3 } ], output: { x: { y: 1 }, z: 2 }, blank: true },

    { input: [ { 'x.y': 42 } ], output: { x: { y: 42 }, z: 2 }, blank: true },

    { input: [ { 'x.x.x': 666 } ], output: { x: { y: 1, x: { x: 666 } }, z: 2 } },

    { input: [ { 'x.x.x': 666, 'z': 3 } ], output: { x: { y: 1, x: { x: 666 } }, z: 2 } },

  ] );

  describeSetter( 'unsetKey', [

    { input: [ 'z' ], output: { x: { y: 1 } } },

    { input: [ 'x.y' ], output: { x: {}, z: 2 } },

    { input: [ 'x.x.x' ], output: { x: { y: 1 }, z: 2 }, blank: true },

  ] );

  describeSetter( 'unsetKeys', [

    { input: [ [ 'z' ] ], output: { x: { y: 1 } } },

    { input: [ [ 'x.y' ] ], output: { x: {}, z: 2 } },

    { input: [ [ 'x.x.x' ] ], output: { x: { y: 1 }, z: 2 }, blank: true },

    { input: [ [ 'x.x.x', 'z' ] ], output: { x: { y: 1 } } },

  ] );

} );
