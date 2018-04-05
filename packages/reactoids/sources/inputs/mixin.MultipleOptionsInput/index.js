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

      toggleOptions( options, bool ) {

        if ( bool === undefined ) {

          bool = ! _.every( options, 'selected' );

        } else {

          if ( bool === true && _.every( options, 'seleted' ) ) return;

          if ( bool === false && _.none( options, 'seleted' ) ) return;

        }

        let operation = bool ? _.union : _.difference;

        let optionsValues = _.map( options, 'value' );

        let prevValue = this.getValue();

        let nextValue = operation( prevValue, optionsValues );

        if ( nextValue.length === 0 && prevValue.length > 0 && this.props.allowBlank === false ) {

          nextValue = [ _.find( optionsValues, ( value ) => _.includes( prevValue, value ) ) ];

        }

        if ( nextValue.length === prevValue.length ) return;

        this.setValue( nextValue );

      },

    };

  },

} );
