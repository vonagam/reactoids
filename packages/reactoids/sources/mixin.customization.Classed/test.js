// skip


defReactMixin( ClassedMixin );


describe( '.argTypes', () => {

  it( 'does have right keys', () =>

    expect( $Mixin.argTypes ).to.have.all.keys( 'classes' )

  );

  it( 'does have right defaulted keys', () =>

    expect( $Mixin.defaultArgs ).to.have.all.keys( 'classes' )

  );

  its( ( { value } ) => titleIf( `does approve = ${ doStringify( value[ 0 ] ) }`, value[ 1 ] ), [

    [ {}, true ],

    [ { classes: {} }, true ],

    [ { classes: true }, false ],

    [ { classes: [] }, false ],

  ], ( [ args, truthy ] ) =>

    expect( args ).onlyIf( truthy ).to.matchTypes( $Mixin.argTypes )

  );

} );

describe( '.constructor', () => {

  contexts( 'with arguments = ${ doStringify( value ) }', [ {}, { classes: {} } ], ( ARGS ) => {

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

      expect( $createMixin() ).to.have.all.keys( 'propTypes', 'defaultProps', 'contextTypes', 'getInitialMembers', 'componentWillMount', 'componentWillUpdate', 'mergeClassNames', 'classed' )

    );

  } );

} );

describe( '#propTypes', () => {

  it( 'does have right keys', () =>

    expect( $mixin.propTypes ).to.have.all.keys( 'className', 'classNameContexted' )

  );

  it( 'does have right defaulted keys', () =>

    expect( $mixin.defaultProps ).to.include( { classNameContexted: true } )

  );

  its( ( { value } ) => titleIf( `does approve = ${ doStringify( value[ 0 ] ) }`, value[ 1 ] ), [

    [ {}, true ],

    [ { className: 'string' }, true ],

    [ { className: [ 'foo', 'bar' ] }, true ],

    [ { className: { 'foo': 'bar' } }, true ],

    [ { className: _.noop }, true ],

    [ { className: 5 }, false ],

    [ { className: true }, false ],

    [ { classNameContexted: 33 }, false ],

  ], ( [ props, truthy ] ) =>

    expect( props ).onlyIf( truthy ).to.matchTypes( $mixin.propTypes )

  );

} );

describe( '#contextTypes', () => {

  it( 'does have right keys', () =>

    expect( $mixin.contextTypes ).to.have.all.keys( 'getClassNames' )

  );

  its( ( { value } ) => titleIf( `does approve = ${ doStringify( value[ 0 ] ) }`, value[ 1 ] ), [

    [ {}, true ],

    [ { getClassNames: _.noop }, true ],

    [ { getClassNames: 'string' }, false ],

    [ { getClassNames: [ 'foo', 'bar' ] }, false ],

    [ { getClassNames: true }, false ],

  ], ( [ context, truthy ] ) =>

    expect( context ).onlyIf( truthy ).to.matchTypes( $mixin.contextTypes )

  );

} );

describe( '#getInitialMembers', () => {

  it( 'does contain mixin private state', () =>

    expect( $mixin.getInitialMembers() ).to.have.property( '_ClassedMixin' )

  );

} );

describe( '#mergeClassNames', () => {

  defFunc( 'mergeClassNames', ( ...args ) => $component.mergeClassNames( ...args ) );


  its( 'does return ${ doStringify( value.output ) } for ${ doStringify( value.input ) }', [

    { input: [ 'foo' ], output: 'foo' },

    { input: [ { 'foo': 'bar' } ], output: { 'foo': 'bar' } },

    { input: [ [], null, undefined, '' ], output: undefined },

    { input: [ [ 'foo' ] ], output: 'foo' },

    { input: [ [ 'foo', undefined ] ], output: 'foo' },

    { input: [ [ 'foo', 'bar' ] ], output: 'foo bar' },

    { input: [ [ 'foo' ], 'bar' ], output: 'foo bar' },

    { input: [ [ 'foo' ], [ 'bar' ], undefined ], output: 'foo bar' },

    { input: [ 'foo', [ undefined, 'bar' ] ], output: 'foo bar' },

    { input: [ [ 'foo', 'bar', {} ] ], output: [ 'foo', 'bar', {} ] },

  ], ( { input, output } ) =>

    expect( $mergeClassNames( ...input ) ).to.be.eql( output )

  );

} );

describe( '#classed', () => {

  defFunc( 'classed', ( ...args ) => $component.classed( ...args ) );

  def( 'ARGS', {

    classes: {

      '-foo': '',

      bar: {

        baz: '',

        '-qux=': [ 'a', 'b', 'c' ],

      },

    },

  } );

  def( 'additionals', {

    displayName: 'StarGhost',

  } );

  def( 'props', {

    className: {

      '': 'pro_root',

      '-foo': 'pro_foo',

      '!-foo': 'pro_oof',

      'bar': {},

      'baz': [ 'pro_baz', 'pro_baz2' ],

      'bar.-qux=a': 'pro_qux_a',

      '-qux=b': 'pro_qux_b',

      'secret.path': 'pro_stranger',

    },

  } );

  defSinon( 'context', {

    getClassNames: spy( _.memoize( ( id, constructor, keys, that ) =>

      _.transform( keys, ( classes, key ) => {

        if ( key.indexOf( '!' ) !== -1 || key.indexOf( '=' ) !== -1 ) return;

        classes[ key ] = key === '' ? `con_${ _.snakeCase( constructor.displayName ) }` : `con_${ key.replace( /\./, '_' ) }`;

      }, {} )

    ) ),

  } );


  its( 'does return ${ doStringify( value.output ) } for ${ doStringify( value.input ) }', [

    { input: [ '' ], output: 'con_star_ghost pro_root pro_oof' },

    { input: [ '', { foo: true } ], output: 'con_star_ghost pro_root con_-foo pro_foo' },

    { input: [ '-foo' ], output: 'con_-foo pro_foo' },

    { input: [ '!-foo' ], output: 'pro_oof' },

    { input: [ 'bar' ], output: [ 'con_bar', {} ] },

    { input: [ 'bar', { qux: 'a' } ], output: [ 'con_bar', {}, 'pro_qux_a' ] },

    { input: [ 'bar', { qux: 'b' } ], output: [ 'con_bar', {}, 'pro_qux_b' ] },

    { input: [ 'bar', { qux: 'c' } ], output: [ 'con_bar', {} ] },

    { input: [ 'bar.baz' ], output: 'con_bar_baz pro_baz pro_baz2' },

    { input: [ 'baz' ], output: 'con_bar_baz pro_baz pro_baz2' },

    { input: [ 'unknown' ], output: undefined },

    { input: [ 'secret.path' ], output: 'pro_stranger' },

  ], ( { input, output } ) =>

    expect( $classed( ...input ) ).to.be.eql( output )

  );

  context( 'with props update', () => {

    beforeEach( ( done ) => $mount.setProps( { className: 'just_this' }, done ) );


    its( 'does return ${ doStringify( value.output ) } for ${ doStringify( value.input ) }', [

      { input: [ '' ], output: 'con_star_ghost just_this' },

      { input: [ '', { foo: true } ], output: 'con_star_ghost just_this con_-foo' },

      { input: [ '-foo' ], output: 'con_-foo' },

      { input: [ '!-foo' ], output: undefined },

      { input: [ 'bar' ], output: 'con_bar' },

      { input: [ 'bar', { qux: 'a' } ], output: 'con_bar' },

      { input: [ 'bar', { qux: 'b' } ], output: 'con_bar' },

      { input: [ 'bar', { qux: 'c' } ], output: 'con_bar' },

      { input: [ 'bar.baz' ], output: 'con_bar_baz' },

      { input: [ 'baz' ], output: 'con_bar_baz' },

      { input: [ 'unknown' ], output: undefined },

      { input: [ 'secret.path' ], output: undefined },

    ], ( { input, output } ) =>

      expect( $classed( ...input ) ).to.be.eql( output )

    );

  } );

  context( 'with props className function', () => {

    beforeEach( ( done ) => {

      $mount.setState( { root: 'that', baz: 'baaaz' } );

      $mount.setProps( { className: ( that ) => ( { '': `just_${ that.state.root }`, 'baz': that.state.baz } ) }, done );

    } );


    its( 'does return ${ doStringify( value.output ) } for ${ doStringify( value.input ) }', [

      { input: [ '' ], output: 'con_star_ghost just_that' },

      { input: [ '', { foo: true } ], output: 'con_star_ghost just_that con_-foo' },

      { input: [ '-foo' ], output: 'con_-foo' },

      { input: [ '!-foo' ], output: undefined },

      { input: [ 'bar' ], output: 'con_bar' },

      { input: [ 'bar', { qux: 'a' } ], output: 'con_bar' },

      { input: [ 'bar', { qux: 'b' } ], output: 'con_bar' },

      { input: [ 'bar', { qux: 'c' } ], output: 'con_bar' },

      { input: [ 'bar.baz' ], output: 'con_bar_baz baaaz' },

      { input: [ 'baz' ], output: 'con_bar_baz baaaz' },

      { input: [ 'unknown' ], output: undefined },

      { input: [ 'secret.path' ], output: undefined },

    ], ( { input, output } ) =>

      expect( $classed( ...input ) ).to.be.eql( output )

    );

  } );

} );
