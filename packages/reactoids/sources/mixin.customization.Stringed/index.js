export default StringedMixin = Mixin.create( {

  name: 'StringedMixin',

  argTypes: {

    strings: PropTypes.arrayOf( PropTypes.string ),

  },

  mixin( ARGS ) {

    const ID = _.uniqueId();

    const KEYS = ARGS.strings;


    const inputToStrings = function( input ) {

      if ( ! _.isObject( input ) ) return undefined;

      if ( _.isArray( input ) ) return _.assign.apply( undefined, _.concat( {}, input ) );

      return input;

    };


    const setPropsStrings = function( that, props ) {

      let stringed = that._StringedMixin;

      let propsStringsInput = props.strings;

      propsStringsInput = _.funced( props.strings, that );

      if ( _.isEqual( stringed.propsStringsInput, propsStringsInput ) ) return false;

      stringed.propsStringsInput = propsStringsInput;

      let propsStrings = inputToStrings( propsStringsInput );

      if ( _.isEqual( stringed.propsStrings, propsStrings ) ) return false;

      stringed.propsStrings = propsStrings;

      return true;

    };

    const setContextStrings = function( that, context ) {

      let stringed = that._StringedMixin;

      let contextStringsInput = _.funced( context.getStrings, ID, that.constructor, KEYS, that );

      contextStringsInput = _.funced( contextStringsInput, that );

      if ( _.isEqual( stringed.contextStringsInput, contextStringsInput ) ) return false;

      stringed.contextStringsInput = contextStringsInput;

      let contextStrings = inputToStrings( contextStringsInput );

      if ( _.isEqual( stringed.contextStrings, contextStrings ) ) return false;

      stringed.contextStrings = contextStrings;

      return true;

    };

    const setStrings = function( that, props, context ) {

      let stringed = that._StringedMixin;

      let changedProps = setPropsStrings( that, props );

      let changedContext = setContextStrings( that, context );

      if ( ! changedProps && ! changedContext ) return;

      stringed.strings = _.assign( {}, stringed.contextStrings, stringed.propsStrings );

    };


    return {

      propTypes: {

        strings: PropTypes.funced( PropTypes.oneOrArrayOf( PropTypes.objectOf( PropTypes.funced( PropTypes.string ) ) ) ), // ( that: mixed ) => {} | Array< {} >

      },

      contextTypes: {

        getStrings: PropTypes.func, // ( id: string, constructor: mixed, keys: Array< string >, instance: mixed ) => object | array

      },

      getInitialMembers() {

        return {

          _StringedMixin: {

            strings: {},

            propsStrings: {},

            propsStringsInput: undefined,

            contextStrings: {},

            contextStringsInput: undefined,

          },

        };

      },

      componentWillMount() {

        setStrings( this, this.props, this.context );

      },

      componentWillUpdate( nextProps, nextState, nextContext ) {

        setStrings( this, nextProps, nextContext );

      },

      stringed( key, params ) {

        let stringed = this._StringedMixin;

        return _.funced( stringed.strings[ key ], params, this );

      },

    };

  },

} );
