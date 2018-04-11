const collectMixins = function( result, mixins ) {

  _.each( mixins, ( mixin ) => {

    if ( ! mixin ) return;

    if ( _.includes( result, mixin ) ) return;

    collectMixins( result, mixin.mixins );

    result.push( mixin );

  } );

};


const MIXERS = [

  {

    keys: [

      'componentWillMount',

      'componentDidMount',

      'componentWillReceiveProps',

      'componentWillUpdate',

      'componentDidUpdate',

      'componentWillUnmount',

      'componentDidCatch',

    ],

    mix( Component, key, values ) {

      if ( Component.prototype[ key ] ) values = values.concat( Component.prototype[ key ] );

      Component.prototype[ key ] = values.length === 1 ? values[ 0 ] : _.queue.apply( undefined, values );

    },

  },

  {

    keys: [

      'getDerivedStateFromProps',

    ],

    mix( Component, key, value ) {

      if ( Component[ key ] ) values = values.concat( Component[ key ] );

      Component[ key ] = function() {

        let changes = null;

        _.each( values, ( value ) => {

          let valueChanges = value.apply( Component, arguments );

          if ( valueChanges ) changes = _.assign( changes, valueChanges );

        } );

        return changes;

      };

    },

  },

  {

    keys: [

      'propTypes',

      'defaultProps',

      'contextTypes',

      'childContextTypes',

    ],

    mix( Component, key, values ) {

      if ( Component[ key ] ) values = values.concat( Component[ key ] );

      Component[ key ] = values.length === 1 ? values[ 0 ] : _.assign.apply( undefined, values );

    },

  },

  {

    keys: [

      'getInitialState',

      'getInitialMembers',

    ],

    mix( Component, key, values ) {

      if ( Component.prototype[ key ] ) values = values.concat( Component.prototype[ key ] );

      Component.prototype[ key ] = values.length === 1 ? values[ 0 ] : function() {

        return _.assign.apply( undefined, _.map( values, ( value ) => value.apply( this ) ) );

      };

    },

  },

  {

    keys: [

      'statics',

    ],

    mix( Component, key, values ) {

      _.each( values, ( values ) => {

        _.each( values, ( value, key ) => {

          assert( _.hasOwn( Component, key ) === false, `Mixin.mix: conflict between mixins for ".${ key }" key` );

          Component[ key ] = value;

        } );

      } );

    },

  },

];


export default Mixin = {

  create( options ) {

    assert( () => {

      let unknownKeys = _.difference( _.keys( options ), [ 'name', 'argTypes', 'defaultArgs', 'mixins', 'mixin' ] );

      if ( unknownKeys.length > 0 ) {

        throw new Error( `Mixin.create: Mixin "${ options.name }" has some unknown options "${ unknownKeys.join( '", "' ) }"` );

      }

    } );

    assert( _.isFunction( options.mixin ), `Mixin.create: Mixin "${ options.name }" does not have mixin function` );


    options = _.defaults( {}, options, {

      name: 'SomeUnknownMixin',

      argTypes: {},

      defaultArgs: {},

      mixins: [],

    } );


    let mixin = function( ARGS ) {

      ARGS = _.defaults( {}, ARGS, mixin.defaultArgs );

      assert( () => {

        assertPropTypes( mixin.argTypes, ARGS, 'mixin argument', mixin.name );

        let unknownKeys = _.difference( _.keys( ARGS ), _.keys( mixin.argTypes ) );

        if ( unknownKeys.length > 0 ) {

          throw new Error( `Mixin.create: Mixin "${ mixin.name }" received unknown args "${ unknownKeys.join( '", "' ) }"` );

        }

      } );

      return options.mixin( ARGS );

    };

    Object.defineProperty( mixin, 'name', { value: options.name } );

    mixin._argTypes = {};

    mixin.argTypes = {};

    mixin.defaultArgs = {};

    mixin.pick = ( ARGS ) => _.pick( ARGS, _.keys( mixin.argTypes ) );


    _.each( options.mixins, ( input, index ) => {

      let argTypes, defaultArgs, Mixin;

      if ( _.isFunction( input ) ) {

        Mixin = input;

        argTypes = Mixin._argTypes;

        defaultArgs = Mixin.defaultArgs;

      } else {

        Mixin = input.Mixin;

        argTypes = Mixin._argTypes;

        defaultArgs = Mixin.defaultArgs;


        if ( input.omit ) {

          argTypes = _.omit( argTypes, input.omit );

          defaultArgs = _.omit( defaultArgs, input.omit );

        }

        if ( input.pick ) {

          argTypes = _.pick( argTypes, input.pick );

          defaultArgs = _.pick( defaultArgs, input.pick );

        }

      }

      _.assign( mixin.argTypes, argTypes );

      _.assign( mixin.defaultArgs, defaultArgs );

    } );

    _.assign( mixin.argTypes, options.argTypes );

    _.assign( mixin.defaultArgs, options.defaultArgs );

    mixin._argTypes = mixin.argTypes;

    mixin.argTypes = _.mapValues( mixin.argTypes, ( type, key ) =>

      _.hasOwn( mixin.defaultArgs, key ) ? type : type.isRequired

    );


    return mixin;

  },

  resolve( inputMixins ) {

    let outputMixins = [];

    collectMixins( outputMixins, inputMixins );

    outputMixins = _.map( outputMixins, mixin => _.omit( mixin, 'mixins' ) );

    return outputMixins;

  },

  mix( Component ) {

    let mixins = Mixin.resolve( Component.mixins );


    if ( mixins.length > 0 ) {

      let mixerValues = _.times( MIXERS.length, () => ( {} ) );

      let addMixerValue = function( index, key, value ) {

        let values = mixerValues[ index ];

        if ( ! values[ key ] ) values[ key ] = [];

        values[ key ].push( value );

      };


      _.each( mixins, ( mixin ) => {

        _.each( mixin, ( value, key ) => {

          let isMixerValue = _.some( MIXERS, ( mixer, index ) => {

            if ( _.includes( mixer.keys, key ) ) {

              addMixerValue( index, key, value );

              return true;

            }

          } );

          if ( ! isMixerValue ) {

            if ( process.env.NODE_ENV !== 'production' ) {

              if ( _.hasOwn( Component.prototype, key ) ) throw new Error( `Mixin.mix: conflict between mixins for "#${ key }" key` );

            }

            Component.prototype[ key ] = value;

          }

        } );

      } );


      _.each( mixerValues, ( values, index ) => {

        _.each( values, ( values, key ) => {

          MIXERS[ index ].mix( Component, key, values );

        } );

      } );

    }


    return class extends Component {

      constructor( props, context ) {

        super( props, context );

        if ( this.getInitialState ) {

          this.state = _.assign( this.state, this.getInitialState() );

        }

        if ( this.getInitialMembers ) {

          _.assign( this, this.getInitialMembers() );

        }

      }

    }

  },

  createClass( spec ) {

    return Mixin.mix( class extends React.Component {

      static displayName = spec.displayName;

      static mixins = [ _.omit( spec, 'displayName' ) ];

    } );

  },

};
