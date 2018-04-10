export default StringedMixin = Mixin.create( {

  name: 'StringedMixin',

  argTypes: {

    strings: PropTypes.arrayOf( PropTypes.string ),

  },

  mixin( ARGS ) {

    const propToStrings = function( input ) {

      if ( ! _.isObject( input ) ) return {};

      if ( _.isArray( input ) ) return _.assign.apply( undefined, _.concat( {}, input ) );

      return input;

    };


    const updateStrings = function( that, props ) {

      let stringed = that._StringedMixin;

      let stringsProp = _.funced( props.strings, that );

      if ( _.isEqual( stringed.stringsProp, stringsProp ) ) return;

      stringed.stringsProp = stringsProp;

      stringed.strings = propToStrings( stringsProp );

    };


    return {

      propTypes: {

        strings: PropTypes.funced( PropTypes.oneOrArrayOf( PropTypes.objectOf( PropTypes.funced( PropTypes.string ) ) ) ), // ( that: mixed ) => {} | Array< {} >

      },

      getInitialMembers() {

        return {

          _StringedMixin: {

            stringsProp: undefined,

            strings: {},

          },

        };

      },

      componentWillMount() {

        updateStrings( this, this.props );

      },

      componentWillUpdate( nextProps ) {

        updateStrings( this, nextProps );

      },

      stringed( key, params ) {

        let stringed = this._StringedMixin;

        return _.funced( stringed.strings[ key ], params, this );

      },

    };

  },

} );
