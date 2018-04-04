export default MultipleOptionsInputMixin = Mixin.create( {

  name: 'MultipleOptionsInputMixin',

  mixins: [

    { Mixin: BaseOptionsInputMixin, omit: [ 'isOptionSelected', 'checkOptionsConflict' ] },

  ],

  defaultArgs: {

    valueType: PropTypes.array,

    defaultValue: [],

  },

  mixin( ARGS ) {

    const BaseOptionsInputArgs = _.defaults( {

      isOptionSelected( that, option, value ) {

        return _.includes( value, option.value );

      },

      checkOptionsConflict( that, props, state ) {

        let selectedValues = that.getValue( props, state );

        let options = that.getOptions( props, state );

        let allowedValues = _.filter( selectedValues, ( value ) => _.some( options, { value } ) );

        if ( allowedValues.length > 0 && allowedValues.length === selectedValues.length ) {

          return;

        }

        if ( allowedValues.length === 0 && ( props.allowBlank === false && options.length > 0 ) ) {

          allowedValues = [ options[ 0 ].value ];

        }

        if ( ! _.isEqual( selectedValues, allowedValues ) ) {

          that.setTempValue( allowedValues );

        }

      },

    }, BaseOptionsInputMixin.pick( ARGS ) );


    return {

      mixins: [

        BaseOptionsInputMixin( BaseOptionsInputArgs ),

      ],

    };

  },

} );
