export default OptionsInputMixin = Mixin.create( {

  name: 'OptionsInputMixin',

  argTypes: {

    optionsMode: PropTypes.funced( PropTypes.oneOf( [ 'single', 'array', 'object' ] ) ), // ( props: object ) => string

  },

  mixins: [

    { Mixin: InputMixin, omit: [ 'applyValueRestrictions' ] },

  ],

  mixin( ARGS ) {

    const MODES = {

      single: {

        valueType: ARGS.valueType,

        emptyValue: ARGS.emptyValue,

        isOptionSelected: ( option, value ) => option.value === value,

        toArray: ( value ) => value !== undefined ? [ value ] : [],

        toValue: ( array ) => array[ array.length - 1 ],

      },

      array: {

        valueType: PropTypes.arrayOf( ARGS.valueType ),

        emptyValue: [],

        isOptionSelected: ( option, value ) => _.includes( value, option.value ),

        toArray: ( value ) => value,

        toValue: ( array ) => array,

      },

      object: {

        valueType: PropTypes.objectOf( PropTypes.oneOf( [ true ] ) ),

        emptyValue: {},

        isOptionSelected: ( option, value ) => Boolean( value[ option.value ] ),

        toArray: ( value ) => _.keys( value ),

        toValue: ( array ) => _.transform( array, ( value, key ) => { value[ key ] = true }, {} ),

      },

    };

    const getOptionsMode = function( props ) {

      return MODES[ _.funced( ARGS.optionsMode, props ) ];

    };


    const mapArrayOption = function( variant, index ) {

      if ( _.isFunction( variant ) ) return mapArrayOption( variant() );

      if ( _.isArray( variant ) ) return { value: variant[ 0 ], label: variant[ 1 ], key: variant[ 2 ] !== undefined ? variant[ 2 ] : index };

      if ( _.isObject( variant ) ) return { value: variant.value, label: variant.label, key: variant.key !== undefined ? variant.key : index };

      return { value: variant, label: variant, key: index };

    };

    const mapObjectOption = function( value, key ) {

      return { value: key, label: value, key: key };

    };


    const InputArgs = _.assign( InputMixin.pick( ARGS ), {

      valueType( props ) {

        return getOptionsMode( props ).valueType.apply( this, arguments );

      },

      emptyValue( props ) {

        return getOptionsMode( props ).emptyValue;

      },

      applyValueRestrictions( that, props, state ) {

        let mode = getOptionsMode( props );

        let selectedValue = that.getValue( props, state );

        let selectedValues = mode.toArray( selectedValue );

        let options = that.getOptions( props, state );

        let allowedValues = _.filter( selectedValues, ( value ) => _.some( options, { value } ) );

        if ( allowedValues.length === selectedValues.length ) {

          if ( allowedValues.length > 0 ) return;

          if ( allowedValues.length === 0 && ( props.allowBlank || options.length === 0 ) ) return;

        }

        if ( allowedValues.length === 0 && ( ! props.allowBlank && options.length > 0 ) ) {

          allowedValues = [ options[ 0 ].value ];

        }

        let allowedValue = mode.toValue( allowedValues );

        that.setValue( allowedValue );

      },

    } );


    return {

      mixins: [

        InputMixin( InputArgs ),

      ],

      propTypes: {

        options: PropTypes.collection.isRequired,

        mapOption: PropTypes.func, // ( value: mixed, key: string ) => { value: mixed, label: mixed, key: string | number }

        allowBlank: PropTypes.bool,

      },

      defaultProps: {

        allowBlank: true,

      },

      componentWillReceiveProps( nextProps ) {

        let prevMode = getOptionsMode( this.props );

        let nextMode = getOptionsMode( nextProps );

        if ( nextMode === prevMode ) return;

        if ( nextProps.value !== undefined ) return;

        let prevValues = prevMode.toArray( this.getValue() );

        let nextValue = nextMode.toValue( prevValues );

        this.setValue( nextValue );

      },

      getOptionsMode() {

        return _.funced( ARGS.optionsMode, this.props );

      },

      getOptions( props = this.props, state = this.state ) {

        let mode = getOptionsMode( props );

        let value = this.getValue( props, state );

        let mapOption = props.mapOption || ( _.isArray( props.options ) ? mapArrayOption : mapObjectOption );

        let options = _.map( props.options, ( optionValue, optionKey ) => {

          let option = mapOption( optionValue, optionKey );

          option.selected = mode.isOptionSelected( option, value );

          return option;

        } );

        return options;

      },

      toggleOptions( options, bool ) {

        if ( bool === undefined ) {

          bool = ! _.every( options, 'selected' );

        } else {

          if ( bool === true && _.every( options, 'selected' ) ) return;

          if ( bool === false && _.none( options, 'selected' ) ) return;

        }

        let mode = getOptionsMode( this.props );

        let operation = bool ? _.union : _.difference;

        let optionsValues = _.map( options, 'value' );

        let prevValues = mode.toArray( this.getValue() );

        let nextValues = operation( prevValues, optionsValues );

        if ( nextValues.length === 0 && prevValues.length > 0 && this.props.allowBlank === false ) {

          nextValues = [ _.find( optionsValues, ( value ) => _.includes( prevValues, value ) ) ];

        }

        if ( nextValues.length === prevValues.length ) return;

        this.setValue( mode.toValue( nextValues ) );

      },

      toggleOption( option, bool ) {

        this.toggleOptions( [ option ], bool );

      },

    };

  },

} );
