export default InputMixin = Mixin.create( {

  name: 'InputMixin',

  argTypes: {

    valueType: PropTypes.func,

    defaultValue: PropTypes.any,

    inputDelay: PropTypes.number,

    validateValue: PropTypes.func, // ( that: mixed, value: mixed ) => ?string

    setCustomValidity: PropTypes.func, // ( that: mixed, message: string ) => void

  },

  defaultArgs: {

    valueType: PropTypes.any,

    defaultValue: undefined,

    inputDelay: 100,

    validateValue: _.noop,

    setCustomValidity: _.noop,

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


    const validate = function( that, props, state ) {

      let value = that.getValue( props, state );


      let argsError = ARGS.validateValue( that, value );

      if ( argsError ) return argsError;


      let propError = _.funced( props.validate, that, value );

      if ( propError ) return propError;


      return '';

    };


    return {

      mixins: [

        BaseKeyMixin( BaseKeyArgs ),

        FocusMixin(),

      ],

      propTypes: {

        value: ARGS.valueType,

        defaultValue: ARGS.valueType,

        onChange: PropTypes.func, // ( value: mixed ) => void

        onTempChange: PropTypes.func, // ( value: mixed ) => void

        inputDelay: PropTypes.number,

        readOnly: PropTypes.bool,

        disabled: PropTypes.bool,

        validate: PropTypes.funced( PropTypes.string ), // ( that: mixed, value: mixed ) => ?string

      },

      defaultProps: {

        defaultValue: ARGS.defaultValue,

        inputDelay: ARGS.inputDelay,

      },

      getInitialState() {

        return {

          valueTemp: undefined,

          valueReal: undefined,

          valueError: validate( this, this.props, {} ),

        };

      },

      getInitialMembers() {

        return { _InputMixin: undefined };

      },

      componentDidMount() {

        if ( this.state.valueError ) {

          ARGS.setCustomValidity( this, this.state.valueError );

        }

      },

      componentWillReceiveProps( nextProps ) {

        if ( ! _.isEqual( this.props.value, nextProps.value ) ) {

          window.clearTimeout( this._InputMixin );

          this.setState( {

            valueTemp: undefined,

            valueReal: undefined,

            valueError: validate( this, nextProps, {} ),

          } );

        } else if ( this.props.validate !== nextProps.validate ) {

          let valueError = validate( this, nextProps, { valueReal: this.state.valueReal } );

          if ( valueError !== this.state.valueError ) {

            this.setState( { valueError } );

          }

        }

      },

      componentDidUpdate( prevProps, prevState ) {

        if ( this.state.valueError !== prevState.valueError ) {

          ARGS.setCustomValidity( this, this.state.valueError );

        }

      },

      componentWillUnmount() {

        window.clearTimeout( this._InputMixin );

      },

      getValue( props = this.props, state = this.state ) {

        if ( state.valueTemp !== undefined ) return state.valueTemp;

        if ( props.value !== undefined ) return props.value;

        if ( state.valueReal !== undefined ) return state.valueReal;

        return props.defaultValue;

      },

      setValue( value, callback ) {

        if ( this.props.readOnly || this.props.disabled ) return;


        window.clearTimeout( this._InputMixin );


        this.setState( {

          valueReal: value,

          valueError: this.props.value !== undefined ? this.state.valueError : validate( this, this.props, { valueReal: value } ),

        }, callback );


        if ( this.state.valueTemp !== undefined ) {

          this._InputMixin = window.setTimeout( () => {

            this.setState( { valueTemp: undefined } );

          }, 0 );

        }


        if ( this.props.onChange ) this.props.onChange( value );

      },

      setTempValue( value, callback ) {

        if ( this.props.readOnly || this.props.disabled ) return;

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

      getValueError() {

        return this.state.valueError;

      },

    };

  },

} );