export default InputMixin = Mixin.create( {

  name: 'InputMixin',

  argTypes: {

    valueType: PropTypes.func,

    emptyValue: PropTypes.funced( PropTypes.any ), // ( props: object ) => mixed

    inputDelay: PropTypes.number,

    validationProps: PropTypes.array,

    validateValue: PropTypes.func, // ( that: mixed, value: mixed ) => ?string

    onValidation: PropTypes.func, // ( that: mixed, message: string ) => void

    applyValueRestrictions: PropTypes.func, // ( that: mixed, props: object, state: object ) => void

    onDisable: PropTypes.func, // ( that: mixed ) => void

    onLabelClick: PropTypes.func, // ( that: mixed ) => void

  },

  defaultArgs: {

    valueType: PropTypes.any,

    emptyValue: undefined,

    inputDelay: 100,

    validationProps: undefined,

    validateValue: _.noop,

    onValidation: _.noop,

    applyValueRestrictions: _.noop,

    onDisable( that ) {

      that.blur();

    },

    onLabelClick( that ) {

      let tabbables = that.findTabbables();

      let tabbable = tabbables[ 0 ];

      if ( ! tabbable ) return;

      tabbable.focus();

      tabbable.click();

    },

  },

  mixins: [

    { Mixin: BaseKeyMixin, pick: [] },

    FocusMixin,

  ],

  mixin( ARGS ) {

    const BaseKeyArgs = {

      name: 'value',

      get( that, props, state ) {

        return that.getValue( props, state );

      },

      set( that, value, callback ) {

        that.setValue( value, callback );

      },

    };


    const VALIDATION_PROPS = _.union( [ 'validate', 'required' ], ARGS.validationProps );


    const getEmptyValue = function( props ) {

      return _.funced( ARGS.emptyValue, props );

    };

    const getInitialValue = function( props ) {

      if ( props.value !== undefined ) return props.value;

      if ( props.defaultValue !== undefined ) return props.defaultValue;

      return getEmptyValue( props );

    };

    const validate = function( that, props, valueReal ) {

      let value = that.getValue( props, { valueReal } );


      let argsError = ARGS.validateValue( that, value );

      if ( argsError ) return argsError;


      let propError = _.funced( props.validate, that, value );

      if ( propError ) return propError;


      return '';

    };


    return {

      mixins: [

        BaseKeyMixin( BaseKeyArgs ),

        FocusMixin( FocusMixin.pick( ARGS ) ),

      ],

      propTypes: {

        value: ARGS.valueType,

        defaultValue: ARGS.valueType,

        inputDelay: PropTypes.number,

        readOnly: PropTypes.bool,

        disabled: PropTypes.bool,

        required: PropTypes.bool,

        validate: PropTypes.funced( PropTypes.string ), // ( that: mixed, value: mixed ) => ?string

        onChange: PropTypes.func, // ( value: mixed ) => void

        onTempChange: PropTypes.func, // ( value: mixed ) => void

        onValidation: PropTypes.func, // ( message: string ) => void

      },

      defaultProps: {

        inputDelay: ARGS.inputDelay,

      },

      statics: {

        getEmptyValue,

      },

      getInitialState() {

        return {

          valueTemp: undefined,

          valueReal: getInitialValue( this.props ),

          valueError: '',

        };

      },

      getInitialMembers() {

        return { _InputMixin: undefined };

      },

      componentWillMount() {

        this.validate();

        ARGS.applyValueRestrictions( this, this.props, this.state );

      },

      componentDidMount() {

        if ( this.state.valueError ) {

          ARGS.onValidation( this, this.state.valueError );

          if ( this.props.onValidation ) this.props.onValidation( this.state.valueError );

        }

      },

      componentWillReceiveProps( nextProps ) {

        if ( ! _.isEqual( this.props.value, nextProps.value ) && nextProps.value !== undefined ) {

          window.clearTimeout( this._InputMixin );

          this.setState( {

            valueTemp: undefined,

            valueReal: nextProps.value,

            valueError: validate( this, nextProps, nextProps.value ),

          } );

        } else if ( ! _.isEqualPick( this.props, nextProps, VALIDATION_PROPS ) ) {

          this.validate( nextProps );

        }

      },

      componentDidUpdate( prevProps, prevState ) {

        if ( this.state.valueError !== prevState.valueError ) {

          ARGS.onValidation( this, this.state.valueError );

          if ( this.props.onValidation ) this.props.onValidation( this.state.valueError );

        }

        if ( this.props.disabled && ! prevProps.disabled ) {

          ARGS.onDisable( this );

        }

        ARGS.applyValueRestrictions( this, this.props, this.state );

      },

      componentWillUnmount() {

        window.clearTimeout( this._InputMixin );

      },

      getValue( props = this.props, state = this.state ) {

        if ( state.valueTemp !== undefined ) return state.valueTemp;

        if ( props.value !== undefined ) return props.value;

        return state.valueReal;

      },

      setValue( value, callback ) {

        if ( this.props.readOnly || this.props.disabled ) return callback();


        window.clearTimeout( this._InputMixin );


        if ( this.props.value === undefined ) {

          this.setState( {

            valueTemp: undefined,

            valueReal: value,

            valueError: validate( this, this.props, value ),

          }, callback );

        } else if ( this.state.valueTemp !== undefined ) {

          this.setState( {

            valueTemp: undefined,

          }, callback );

        }


        if ( this.props.onChange ) this.props.onChange( value );

      },

      setTempValue( value, callback ) {

        if ( this.props.readOnly || this.props.disabled ) return callback();

        if ( this.props.inputDelay === 0 ) return this.setValue( value, callback );


        window.clearTimeout( this._InputMixin );


        this.setState( {

          valueTemp: value,

        }, callback );


        if ( this.props.inputDelay > 0 ) {

          this._InputMixin = window.setTimeout( () => {

            this.setValue( value );

          }, this.props.inputDelay );

        }


        if ( this.props.onTempChange ) this.props.onTempChange( value );

      },

      validate( props = this.props, valueReal = this.state.valueReal ) {

        let valueError = validate( this, props, valueReal );

        if ( valueError !== this.state.valueError ) {

          this.setState( { valueError } );

        }

      },

      getValueError() {

        return this.state.valueError;

      },

      isEmptyValue( value, props = this.props ) {

        return _.isEqual( value, getEmptyValue( props ) );

      },

      onLabelClick() {

        ARGS.onLabelClick( this );

      },

    };

  },

} );
