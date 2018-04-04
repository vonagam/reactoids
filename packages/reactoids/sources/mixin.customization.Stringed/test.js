defReactMixin( StringedMixin, { strings: [] } );


describe( '.argTypes', () => {

  it( 'does have right keys', () =>

    expect( $Mixin.argTypes ).to.have.all.keys( 'strings' )

  );

  it( 'does have right defaulted keys', () =>

    expect( $Mixin.defaultArgs ).to.be.empty

  );

  its( ( { value } ) => titleIf( `does approve = ${ doStringify( value[ 0 ] ) }`, value[ 1 ] ), [

    [ { strings: [] }, true ],

    [ { strings: [ 'key' ] }, true ],

    [ {}, false ],

    [ { strings: true }, false ],

    [ { strings: [ 4 ] }, false ],

    [ { strings: {} }, false ],

  ], ( [ args, truthy ] ) =>

    expect( args ).onlyIf( truthy ).to.matchTypes( $Mixin.argTypes )

  );

} );

describe( '.constructor', () => {

  contexts( 'with arguments = ${ doStringify( value ) }', [ { strings: [] }, { strings: [ 'key' ] } ], ( ARGS ) => {

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

    it( 'cannot be mixed with itself', () =>

      expect( () => $checkMixing( $createMixin(), $createMixin() ) ).to.throw()

    );

    it( 'does return object with right properties', () =>

      expect( $createMixin() ).to.have.all.keys( 'propTypes', 'contextTypes', 'getInitialMembers', 'componentWillMount', 'componentWillUpdate', 'stringed' )

    );

  } );

} );

describe( '#propTypes', () => {

  it( 'does have right keys', () =>

    expect( $mixin.propTypes ).to.have.all.keys( 'strings' )

  );

  its( ( { value } ) => titleIf( `does approve = ${ doStringify( value[ 0 ] ) }`, value[ 1 ] ), [

    [ {}, true ],

    [ { strings: { 'foo': 'bar' } }, true ],

    [ { strings: [ { 'foo': 'bar' }, { 'baz': 'qux' } ] }, true ],

    [ { strings: _.noop }, true ],

    [ { strings: 'string' }, false ],

    [ { strings: [ 'foo', 'bar' ] }, false ],

    [ { strings: 5 }, false ],

    [ { strings: true }, false ],

  ], ( [ props, truthy ] ) =>

    expect( props ).onlyIf( truthy ).to.matchTypes( $mixin.propTypes )

  );

} );

describe( '#contextTypes', () => {

  it( 'does have right keys', () =>

    expect( $mixin.contextTypes ).to.have.all.keys( 'getStrings' )

  );

  its( ( { value } ) => titleIf( `does approve = ${ doStringify( value[ 0 ] ) }`, value[ 1 ] ), [

    [ {}, true ],

    [ { getStrings: _.noop }, true ],

    [ { getStrings: 'string' }, false ],

    [ { getStrings: [ 'foo', 'bar' ] }, false ],

    [ { getStrings: true }, false ],

  ], ( [ context, truthy ] ) =>

    expect( context ).onlyIf( truthy ).to.matchTypes( $mixin.contextTypes )

  );

} );

describe( '#getInitialMembers', () => {

  it( 'does contain mixin private state', () =>

    expect( $mixin.getInitialMembers() ).to.have.property( '_StringedMixin' )

  );

} );

describe( '#stringed', () => {

  defFunc( 'stringed', ( ...args ) => $component.stringed( ...args ) );

  def( 'ARGS', { strings: [ 'foo', 'bar', 'qux' ] } );

  def( 'additionals', {

    displayName: 'Fleece',

  } );

  def( 'props', {

    strings: { foo: 'pro_foo', bar: ( value ) => `pro_bar_${ value }` },

  } );

  defSinon( 'context', {

    getStrings: spy( _.memoize( ( id, constructor, keys, that ) =>

      _.transform( keys, ( strings, key ) => {

        strings[ key ] = `con_${ key }`;

      }, {} )

    ) ),

  } );


  its( 'does return ${ doStringify( value.output ) } for ${ doStringify( value.input ) }', [

    { input: [ 'foo' ], output: 'pro_foo' },

    { input: [ 'foo', '11' ], output: 'pro_foo' },

    { input: [ 'bar', ], output: 'pro_bar_undefined' },

    { input: [ 'bar', '11' ], output: 'pro_bar_11' },

    { input: [ 'qux' ], output: 'con_qux' },

    { input: [ 'qux', '11' ], output: 'con_qux' },

  ], ( { input, output } ) =>

    expect( $stringed( ...input ) ).to.equal( output )

  );

  context( 'with props update', () => {

    beforeEach( ( done ) => $mount.setProps( { strings: { bar: ( value ) => `pro_bar_${ value }`, qux: 'pro_qux' } }, done ) );


    its( 'does return ${ doStringify( value.output ) } for ${ doStringify( value.input ) }', [

      { input: [ 'foo' ], output: 'con_foo' },

      { input: [ 'foo', '11' ], output: 'con_foo' },

      { input: [ 'bar', ], output: 'pro_bar_undefined' },

      { input: [ 'bar', '11' ], output: 'pro_bar_11' },

      { input: [ 'qux' ], output: 'pro_qux' },

      { input: [ 'qux', '11' ], output: 'pro_qux' },

    ], ( { input, output } ) =>

      expect( $stringed( ...input ) ).to.equal( output )

    );

  } );

  context( 'with props strings function', () => {

    beforeEach( ( done ) => {

      $mount.setState( { foo: 'that', bar: 'sta_bar' } );

      $mount.setProps( { strings: ( that ) => ( { 'foo': `just_${ that.state.foo }`, 'bar': that.state.bar } ) }, done );

    } );


    its( 'does return ${ doStringify( value.output ) } for ${ doStringify( value.input ) }', [

      { input: [ 'foo' ], output: 'just_that' },

      { input: [ 'foo', '11' ], output: 'just_that' },

      { input: [ 'bar', ], output: 'sta_bar' },

      { input: [ 'bar', '11' ], output: 'sta_bar' },

      { input: [ 'qux' ], output: 'con_qux' },

      { input: [ 'qux', '11' ], output: 'con_qux' },

    ], ( { input, output } ) =>

      expect( $stringed( ...input ) ).to.equal( output )

    );

  } );

} );
