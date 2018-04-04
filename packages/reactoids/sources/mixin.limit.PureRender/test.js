defReactMixin( PureRenderMixin );


describe( '.argTypes', () => {

  it( 'does have right keys', () =>

    expect( $Mixin.argTypes ).to.have.all.keys( 'purifiedPaths', 'dirtiedPaths' )

  );

  it( 'does have right defaulted keys', () =>

    expect( $Mixin.defaultArgs ).to.have.all.keys( 'purifiedPaths', 'dirtiedPaths' )

  );

  its( ( { value } ) => titleIf( `does approve = ${ doStringify( value[ 0 ] ) }`, value[ 1 ] ), [

    [ {}, true ],

    [ { purifiedPaths: [], dirtiedPaths: [] }, true ],

    [ { purifiedPaths: [ 'pure' ], dirtiedPaths: [ 'dirty' ] }, true ],

    [ { purifiedPaths: 'pure' }, false ],

  ], ( [ args, truthy ] ) =>

    expect( args ).onlyIf( truthy ).to.matchTypes( $Mixin.argTypes )

  );

} );

describe( '.constructor', () => {

  contexts( 'with arguments = ${ doStringify( value ) }', [

    {},

    { purifiedPaths: [ 'pure' ], dirtiedPaths: [ 'dirty' ] },

  ], ( ARGS ) => {

    def( 'ARGS', ARGS );


    it( 'can be created without arguments', () =>

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

      expect( $createMixin() ).to.have.all.keys( 'shouldComponentUpdate', '_bind', '_partial', '_ary', '_queue' )

    );

  } );

} );

describe( '#shouldComponentUpdate', () => {

  defSinon( 'shouldComponentUpdate', () => spy( $component, 'shouldComponentUpdate' ) );

  def( 'props', {

    value: 1,

    func: _.noop,

  } );


  contexts( 'with props update = ${ doStringify( value.props ) }', [

    { props: {}, should: false },

    { props: { value: 1 }, should: false },

    { props: { func: _.noop }, should: false },

    { props: { value: 2 }, should: true },

    { props: { func: () => {} }, should: true },

    { props: { value: 2, func: () => {} }, should: true },

  ], ( { props, should } ) => {

    beforeEach( ( done ) => $mount.setProps( props, done ) );


    itIf( 'should update', should, () =>

      expect( $shouldComponentUpdate ).to.be.calledOnce.and.have.returned( should )

    );

  } );

  contexts( 'with ${ key } bind', { standart: () => _.bind, mixed: () => $component._bind }, ( getBind, type ) => {

    let should = type == 'standart';

    beforeEach( ( done ) => $mount.setState( { hello: ( getBind() )( _.noop, {} ) }, done ) );

    beforeEach( () => $shouldComponentUpdate.reset() );

    beforeEach( ( done ) => $mount.setState( { hello: ( getBind() )( _.noop, {} ) }, done ) );


    itIf( 'should update', should, () =>

      expect( $shouldComponentUpdate ).to.be.calledOnce.and.have.returned( should )

    );

  } );

  contexts( 'with ${ key } partial', { standart: () => _.partial, mixed: () => $component._partial }, ( getPartial, type ) => {

    let should = type == 'standart';

    beforeEach( ( done ) => $mount.setState( { hello: ( getPartial() )( _.noop, {} ) }, done ) );

    beforeEach( () => $shouldComponentUpdate.reset() );

    beforeEach( ( done ) => $mount.setState( { hello: ( getPartial() )( _.noop, {} ) }, done ) );


    itIf( 'should update', should, () =>

      expect( $shouldComponentUpdate ).to.be.calledOnce.and.have.returned( should )

    );

  } );

  contexts( 'with ${ key } ary', { standart: () => _.ary, mixed: () => $component._ary }, ( getAry, type ) => {

    let should = type == 'standart';

    beforeEach( ( done ) => $mount.setState( { hello: ( getAry() )( _.noop, 1 ) }, done ) );

    beforeEach( () => $shouldComponentUpdate.reset() );

    beforeEach( ( done ) => $mount.setState( { hello: ( getAry() )( _.noop, 1 ) }, done ) );


    itIf( 'should update', should, () =>

      expect( $shouldComponentUpdate ).to.be.calledOnce.and.have.returned( should )

    );

  } );

  contexts( 'with ${ key } queue', { standart: () => _.queue, mixed: () => $component._queue }, ( getQueue, type ) => {

    let should = type == 'standart';

    beforeEach( ( done ) => $mount.setState( { hello: ( getQueue() )( _.noop, _.noop ) }, done ) );

    beforeEach( () => $shouldComponentUpdate.reset() );

    beforeEach( ( done ) => $mount.setState( { hello: ( getQueue() )( _.noop, _.noop ) }, done ) );


    itIf( 'should update', should, () =>

      expect( $shouldComponentUpdate ).to.be.calledOnce.and.have.returned( should )

    );

  } );

} );
