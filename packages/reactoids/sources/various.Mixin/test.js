describe( '.create', () => {

  context( 'with invalid options', () => {

    contexts( {

      'no mixin function': {},

      'unknown option key': { mixin: _.noop, unknown: 1 },

    }, ( options ) => {

      it( 'does throw', () =>

        expect( () => Mixin.create( options ) ).to.throw()

      );

    } );

  } );

  context( 'with valid options', () => {

    it( 'does return function', () =>

      expect( Mixin.create( { mixin: _.noop } ) ).to.be.a( 'function' )

    );

    describe( 'returned function', () => {

      describe( '#name', () => {

        it( 'does set function name from options', () =>

          expect( Mixin.create( { mixin: _.noop, name: 'check' } ) ).to.have.property( 'name' ).that.equal( 'check' )

        );

      } );

      describe( '#argTypes, #defaultArgs', () => {

        contexts( 'with ${ key }', {

          'nothing': {

            options: { mixin: _.noop },

            argTypes: {}, defaultArgs: {},

          },

          'simple argTypes': {

            options: { mixin: _.noop, argTypes: { a: PropTypes.string } },

            argTypes: { a: PropTypes.string.isRequired },

            defaultArgs: {},

          },

          'simple argTypes and defaultArgs': {

            options: { mixin: _.noop, argTypes: { a: PropTypes.string }, defaultArgs: { a: 'x' } },

            argTypes: { a: PropTypes.string },

            defaultArgs: { a: 'x' },

          },

          'simple argTypes and defaultArgs 2': {

            options: { mixin: _.noop, argTypes: { a: PropTypes.string }, defaultArgs: { a: undefined } },

            argTypes: { a: PropTypes.string },

            defaultArgs: { a: undefined },

          },

          'inherited simple argTypes': {

            options: { mixin: _.noop, mixins: [ Mixin.create( { mixin: _.noop, argTypes: { a: PropTypes.string } } ) ] },

            argTypes: { a: PropTypes.string.isRequired },

            defaultArgs: {},

          },

          'inherited simple argTypes and defaultArgs': {

            options: { mixin: _.noop, mixins: [ Mixin.create( { mixin: _.noop, argTypes: { a: PropTypes.string }, defaultArgs: { a: 'x' } } ) ] },

            argTypes: { a: PropTypes.string },

            defaultArgs: { a: 'x' },

          },

          'inherited omit': {

            options: { mixin: _.noop, mixins: [ { Mixin: Mixin.create( { mixin: _.noop, argTypes: { a: PropTypes.string, b: PropTypes.string  }, defaultArgs: { a: 'x' } } ), omit: [ 'a' ] } ] },

            argTypes: { b: PropTypes.string.isRequired },

            defaultArgs: {},

          },

          'inherited pick': {

            options: { mixin: _.noop, mixins: [ { Mixin: Mixin.create( { mixin: _.noop, argTypes: { a: PropTypes.string, b: PropTypes.string  }, defaultArgs: { a: undefined } } ), pick: [ 'a' ] } ] },

            argTypes: { a: PropTypes.string },

            defaultArgs: { a: undefined },

          },

          'inherited overwrite': {

            options: { mixin: _.noop, argTypes: { c: PropTypes.string }, defaultArgs: { b: 'y' }, mixins: [ Mixin.create( { mixin: _.noop, argTypes: { a: PropTypes.string, b: PropTypes.string  }, defaultArgs: { a: 'x' } } ) ] },

            argTypes: { a: PropTypes.string, b: PropTypes.string, c: PropTypes.string.isRequired },

            defaultArgs: { a: 'x', b: 'y' },

          },

        }, ( { options, argTypes, defaultArgs } ) => {

          it( 'does set right', () => {

            let mixin = Mixin.create( options );

            expect( mixin.argTypes ).to.be.deep.equal( argTypes );

            expect( mixin.defaultArgs ).to.be.deep.equal( defaultArgs );

          } );

        } );

      } );

      describe( '#pick', () => {

        contexts( 'with ${ key }', {

          'nothing': {

            options: { mixin: _.noop },

            result: {},

          },

          'argTypes': {

            options: { mixin: _.noop, argTypes: { a: PropTypes.string } },

            result: { a: 'string' },

          },

          'mixins': {

            options: { mixin: _.noop, mixins: [ Mixin.create( { mixin: _.noop, argTypes: { b: PropTypes.number } } ) ] },

            result: { b: 1 },

          },

          'argTypes and mixins': {

            options: { mixin: _.noop, argTypes: { a: PropTypes.string }, mixins: [ Mixin.create( { mixin: _.noop, argTypes: { b: PropTypes.number } } ) ] },

            result: { a: 'string', b: 1 },

          },

        }, ( { options, result } ) => {

          it( 'does pick relevant subset of args', () =>

            expect( Mixin.create( options ).pick( { a: 'string', b: 1, c: true } ) ).to.eql( result )

          );

        } );

      } );

      context( 'with invalid args', () => {

        contexts( {

          'required arg is absent': {

            options: { mixin: _.noop, argTypes: { a: PropTypes.string } },

            args: {},

          },

          'required inherited arg is absent': {

            options: { mixin: _.noop, mixins: [ Mixin.create( { mixin: _.noop, argTypes: { a: PropTypes.string } } ) ] },

            args: {},

          },

          'arg of wrong type': {

            options: { mixin: _.noop, argTypes: { a: PropTypes.string } },

            args: { a: 1 },

          },

          'required inherited arg is absent': {

            options: { mixin: _.noop, mixins: [ Mixin.create( { mixin: _.noop, argTypes: { a: PropTypes.string } } ) ] },

            args: { a: 1 },

          },

          'unknown arg': {

            options: { mixin: _.noop, argTypes: { a: PropTypes.string } },

            args: { b: 1 },

          },

        }, ( { options, args } ) => {

          it( 'does throw', () => {

            let mixin = Mixin.create( options );

            expect( () => mixin( args ) ).to.throw();

          } );

        } );

      } );

      context( 'with valid args', () => {

        it( 'does call mixin function with defaulted args and return result', () => {

          let func = spy( () => ( {} ) );

          let mixin = Mixin.create( {

            argTypes: { a: PropTypes.string, b: PropTypes.number, c: PropTypes.bool },

            defaultArgs: { a: 'string', b: 1 },

            mixin: func,

          } );

          expect( func ).not.to.be.called;

          let result = mixin( { b: 2, c: true } );

          expect( func ).to.be.calledOnce.and.be.calledWithMatch( { a: 'string', b: 2, c: true } );

          expect( result ).to.equal( func.lastCall.returnValue );

        } );

      } );

    } );

  } );

} );

describe( '.resolve', () => {

  contexts( 'with ${ key }', {

    'empty array': {

      input: [],

      output: [],

    },

    'simple mixin': {

      input: [ { x: 1 } ],

      output: [ { x: 1 } ],

    },

    'two simple ones': {

      input: [ { x: 1 }, { y: 2 } ],

      output: [ { x: 1 }, { y: 2 } ],

    },

    'mixin with mixins': {

      input: [ { x: 1, mixins: [ { z: 3 } ] }, { y: 2 } ],

      output: [ { z: 3 }, { x: 1 }, { y: 2 } ],

    },

    'some falsey stuff': {

      input: [ { x: 1, mixins: [ { z: 3 }, false ] }, undefined, { y: 2 }, null ],

      output: [ { z: 3 }, { x: 1 }, { y: 2 } ],

    },

    'duplicates': {

      input: ( () => {

        let mixin = { z: 3 };

        return [ { x: 1, mixins: [ mixin ] }, { y: 2 }, mixin, mixin ];

      } )(),

      output: [ { z: 3 }, { x: 1 }, { y: 2 } ],

    },

  }, ( { input, output } ) => {

    it( 'does return flattened mixins array without duplicates and mixins in order of dependency', () =>

      expect( Mixin.resolve( input ) ).to.be.eql( output )

    );

  } );

} );

describe( '.mix', () => {

  defFunc( 'mix', ( mixins ) =>

    Mixin.mix( class extends React.Component {

      static mixins = mixins;

    } )

  );


  contexts( {

    'without mixins': [],

    'with mixins': [ { x: 1 } ],

  }, ( mixins ) => {

    it( 'does return class function', () =>

      expect( $mix( mixins ) ).to.be.a( 'function' )

    );

  } );

  describe( 'component lifecycle method', () => {

    contexts( '${ value }', [

      'componentWillMount',

      'componentDidMount',

      'componentWillReceiveProps',

      'componentWillUpdate',

      'componentDidUpdate',

      'componentWillUnmount',

      'componentDidCatch',

    ], ( key ) => {

      it( 'does queue methods in right order', () => {

        let hookA = spy();

        let hookB = spy();

        let Component = $mix( [ { [ key ]: hookA }, { [ key ]: hookB } ] );

        expect( Component.prototype ).to.have.property( key ).that.is.a( 'function' );

        Component.prototype[ key ]( 1, 'string' );

        expect( hookA ).to.be.calledOnce.and.calledWithExactly( 1, 'string' );

        expect( hookB ).to.be.calledOnce.and.calledWithExactly( 1, 'string' );

        expect( hookB ).to.be.calledImmediatelyAfter( hookA );

      } );

    } );

  } );

  describe( 'types', () => {

    contexts( '${ value }', [

      'propTypes',

      'defaultProps',

      'contextTypes',

      'childContextTypes',

    ], ( key ) => {

      it( 'does merge objects in right order', () => {

        let Component = $mix( [ { [ key ]: { x: 1, y: 2 } }, { [ key ]: { y: 3, z: 4 } } ] );

        expect( Component ).to.have.property( key ).that.eql( { x: 1, y: 3, z: 4 } );

      } );

    } );

  } );

  describe( 'state and members', () => {

    contexts( '${ value }', [

      'getInitialState',

      'getInitialMembers',

    ], ( key ) => {

      it( 'does queue methods in right order and return merged result', () => {

        let hookA = spy( _.constant( { x: 1, y: 2 } ) );

        let hookB = spy( _.constant( { y: 3, z: 4 } ) );

        let Component = $mix( [ { [ key ]: hookA }, { [ key ]: hookB } ] );

        expect( Component.prototype ).to.have.property( key ).that.is.a( 'function' );

        let result = Component.prototype[ key ]();

        expect( hookA ).to.be.calledOnce;

        expect( hookB ).to.be.calledOnce;

        expect( hookB ).to.be.calledImmediatelyAfter( hookA );

        expect( result ).to.eql( { x: 1, y: 3, z: 4 } );

      } );

    } );

  } );

  describe( 'statics', () => {

    context( 'with conflicts', () => {

      it( 'does throw', () =>

        expect( () => $mix( [ { statics: { x: 1 } }, { statics: { x: 1 } } ] ) ).to.throw()

      );

    } );

    context( 'without conflicts', () => {

      it( 'does assign values to function', () => {

        let Component = $mix( [ { statics: { x: 1, y: 2 } }, { statics: { z: 3 } } ] );

        expect( Component ).to.include( { x: 1, y: 2, z: 3 } );

      } );

    } );

  } );

  describe( 'other', () => {

    context( 'with conflicts', () => {

      it( 'does throw', () =>

        expect( () => $mix( [ { x: 1 }, { x: 1 } ] ) ).to.throw()

      );

    } );

    context( 'without conflicts', () => {

      it( 'does assign values to prototype', () => {

        let Component = $mix( [ { x: 1, y: 2 }, { z: 3 } ] );

        expect( Component.prototype ).to.include( { x: 1, y: 2, z: 3 } );

      } );

    } );

  } );

  describe( 'constructor', () => {

    it( 'does add state and members initialization', () => {

      let Component = $mix( [ {

        getInitialState: _.constant( { x: 1, y: 2 } ),

        getInitialMembers: _.constant( { z: 3 } ),

        render: _.constant( null ),

      } ] );

      let component = mount( <Component /> ).instance();

      expect( component ).to.have.property( 'state' ).that.includes( { x: 1, y: 2 } );

      expect( component ).to.include( { z: 3 } );

    } );

  } );

} );

describe( '.createClass', () => {

  it( 'does return a component class', () =>

    expect( Mixin.createClass( {} ).prototype ).to.be.instanceof( React.Component )

  );

  it( 'does allow setting displayName', () =>

    expect( Mixin.createClass( { displayName: 'MixedComponent' } ) ).to.include( { displayName: 'MixedComponent' } )

  );

} );
