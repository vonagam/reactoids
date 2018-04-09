export default BaseOptionsInputMixin = Mixin.create( {

  name: 'BaseOptionsInputMixin',

  argTypes: {

    isOptionSelected: PropTypes.func, // ( that: mixed, option: mixed, value: mixed ) => boolean

  },

  mixins: [

    InputMixin,

  ],

  mixin( ARGS ) {

    const mapArrayOption = function( variant, index ) {

      if ( _.isFunction( variant ) ) return mapArrayOption( variant() );

      if ( _.isArray( variant ) ) return { value: variant[ 0 ], label: variant[ 1 ], key: variant[ 2 ] !== undefined ? variant[ 2 ] : index };

      if ( _.isObject( variant ) ) return { value: variant.value, label: variant.label, key: variant.key !== undefined ? variant.key : index };

      return { value: variant, label: variant, key: index };

    };

    const mapObjectOption = function( value, key ) {

      return { value: key, label: value, key: key };

    };


    return {

      mixins: [

        InputMixin( InputMixin.pick( ARGS ) ),

      ],

      propTypes: {

        options: PropTypes.collection.isRequired,

        mapOption: PropTypes.func, // ( value: mixed, key: string ) => { value: mixed, label: mixed }

        allowBlank: PropTypes.bool,

      },

      defaultProps: {

        allowBlank: true,

      },

      getOptions( props = this.props, state = this.state ) {

        let value = this.getValue( props, state );

        let mapOption = props.mapOption || ( _.isArray( props.options ) ? mapArrayOption : mapObjectOption );

        return _.map( props.options, ( optionValue, optionKey ) => {

          let option = mapOption( optionValue, optionKey );

          option.selected = ARGS.isOptionSelected( this, option, value );

          return option;

        } );

      },

    };

  },

} );
