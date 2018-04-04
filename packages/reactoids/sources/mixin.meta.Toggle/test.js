defReactMixin( ToggleMixin, { toggle: _.noop } );


describe( '.argTypes', () => {

  it( 'does have right keys', () =>

    expect( $Mixin.argTypes ).to.have.all.keys( 'name', 'toggle', 'checks' )

  );

  it( 'does have right defaulted keys', () =>

    expect( $Mixin.defaultArgs ).to.have.all.keys( 'name', 'checks' )

  );

  its( ( { value } ) => titleIf( `does approve = ${ doStringify( value[ 0 ] ) }`, value[ 1 ] ), [

    [ {}, false ],

    [ { toggle: _.noop }, true ],

    [ { toggle: _.noop, name: 'asd' }, true ],

    [ { toggle: _.noop, name: 123 }, false ],

    [ { toggle: _.noop, checks: {} }, true ],

    [ { toggle: _.noop, checks: { componentDidMount: _.noop } }, true ],

    [ { toggle: _.noop, checks: { componentDidMount: true } }, true ],

    [ { toggle: _.noop, checks: { componentDidMount: 33 } }, false ],

  ], ( [ args, truthy ] ) =>

    expect( args ).onlyIf( truthy ).to.matchTypes( $Mixin.argTypes )

  );

} );

describe( '.constructor', () => {

  contexts( 'with valid arguments = ${ doStringify( value ) }', [ { toggle: _.noop }, { toggle: _.noop, name: 'asd', checks: { componentDidMount: _.noop } } ], ( ARGS ) => {

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

      let properties = [ 'getInitialMembers', 'componentWillUnmount', `is${ _.pascalCase( $ARGS.name ) }Toggled` ];

      _.append( properties, _.keys( ARGS.checks ) );

      expect( $createMixin() ).to.have.all.keys( properties );

    } );

  } );

} );

describe( '#getInitialMembers', () => {

  it( 'does contain mixin private state', () =>

    expect( $mixin.getInitialMembers() ).to.have.property( '_ToggleMixin' )

  );

} );

describe( '#componentWillUnmount', () => {

  def( 'ARGS', () => ( { toggle: $toggle } ) );

  defSinon( 'toggle', spy() );


  contexts( {

    'if toggled on': { checks: { componentWillMount: _.constant( true ) }, calls: true },

    'if toggled on/off': { checks: { componentWillMount: _.constant( true ), componentWillUpdate: _.constant( false ) }, calls: false },

    'if never toggled': { checks: {}, calls: false },

  }, ( { checks, calls } ) => {

    def( 'ARGS', () => _.assign( $ARGS, { checks } ) );

    beforeEach( 'mount component', () => $mount );

    beforeEach( 'update component', () => $mount.setState( { x: 1 } ) );


    itIf( 'does calls toggle off', calls, ( truthy ) => {

      $toggle.resetHistory();

      let component = $component;

      $mount.unmount()

      expect( $toggle ).to.have.callCount( +truthy );

      expect( $toggle ).onlyIf( truthy ).to.be.calledWithExactly( component, false );

    } );

  } );

} );

describe( '#isToggled', () => {

  contexts( {

    'if toggled on': { checks: { componentWillMount: _.constant( true ) }, returns: true },

    'if toggled on/off': { checks: { componentWillMount: _.constant( true ), componentWillUpdate: _.constant( false ) }, returns: false },

    'if never toggled': { checks: {}, returns: false },

  }, ( { checks, returns } ) => {

    def( 'ARGS', () => _.assign( $ARGS, { checks } ) );

    beforeEach( 'mount component', () => $mount );

    beforeEach( 'update component', () => $mount.setState( { x: 1 } ) );


    it( `does return ${ returns }`, () =>

      expect( $component.isToggled() ).be.equal( returns )

    );

  } );

} );

describe( 'checks:', () => {

  contexts( '${ value }:', [

    'componentWillMount',

    'componentDidMount',

    'componentWillReceiveProps',

    'componentWillUpdate',

    'componentDidUpdate',

  ], ( check ) => {

    def( 'ARGS', () => _.assign( $ARGS, { toggle: $toggle, checks: { [ check ]: $check } } ) );

    defSinon( 'toggle', spy() );

    defSinon( 'check', stub() );


    it( 'does get called on component check with instance and provided arguments', () => {

      let instance = {};

      expect( () => $mixin[ check ].call( instance, 'x', 1 ) ).to.alter( () => $check.callCount, { from: 0, to: 1 } );

      expect( $check ).to.be.calledWithExactly( instance, 'x', 1 );

    } );

    itVariations( 'does call toggle if returned opposite boolean to current state', {

      state: [ false, true ],

      returns: [ false, true, undefined ],

    }, {

      beforeEach() { $toggle.resetHistory(); $check.reset(); },

    }, ( { state, returns } ) => {

      let truthy = returns === ! state;

      let instance = { _ToggleMixin: state };

      $check.returns( returns );

      expect( () => $mixin[ check ].call( instance ) ).to.alter( () => $toggle.callCount, { from: 0, to: +truthy } );

      expect( $toggle ).onlyIf( truthy ).to.be.calledWithExactly( instance, returns );

      expect( () => $mixin[ check ].call( instance ) ).not.to.alter( () => $toggle.callCount );

    } );

  } );

} );
