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

      let focusables = that.findFocusables();

      let focusable = focusables[ 0 ];

      if ( ! focusable ) return;

      focusable.focus();

      focusable.click();

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


    const VALIDATION_PROPS = _.union( [ 'validity', 'required' ], ARGS.validationProps );


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


      let argsValidity = ARGS.validateValue( that, value );

      if ( argsValidity ) return argsValidity;


      let propValidity = _.funced( props.validity, that, value );

      if ( propValidity ) return propValidity;


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

        validity: PropTypes.funced( PropTypes.string ), // ( that: mixed, value: mixed ) => ?string

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

          valueValidity: '',

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

        if ( this.state.valueValidity ) {

          ARGS.onValidation( this, this.state.valueValidity );

          if ( this.props.onValidation ) this.props.onValidation( this.state.valueValidity );

        }

      },

      componentWillReceiveProps( nextProps ) {

        if ( ! _.isEqual( this.props.value, nextProps.value ) && nextProps.value !== undefined ) {

          window.clearTimeout( this._InputMixin );

          this.setState( {

            valueTemp: undefined,

            valueReal: nextProps.value,

            valueValidity: validate( this, nextProps, nextProps.value ),

          } );

        } else if ( ! _.isEqualPick( this.props, nextProps, VALIDATION_PROPS ) ) {

          this.validate( nextProps );

        }

      },

      componentDidUpdate( prevProps, prevState ) {

        if ( this.state.valueValidity !== prevState.valueValidity ) {

          ARGS.onValidation( this, this.state.valueValidity );

          if ( this.props.onValidation ) this.props.onValidation( this.state.valueValidity );

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

            valueValidity: validate( this, this.props, value ),

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

        let valueValidity = validate( this, props, valueReal );

        if ( valueValidity !== this.state.valueValidity ) {

          this.setState( { valueValidity } );

        }

      },

      getValueValidity() {

        return this.state.valueValidity;

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
