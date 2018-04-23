const getInitialValue = function( Input, inputProps ) {

  Input = Wrapper.getComponent( Input );

  inputProps = _.defaults( {}, inputProps, Input.defaultProps );

  if ( inputProps.value !== undefined ) return inputProps.value;

  if ( inputProps.defaultValue !== undefined ) return inputProps.defaultValue;

  return Input.getEmptyValue( inputProps );

};

const isEmptytValue = function( Input, inputProps, value ) {

  Input = Wrapper.getComponent( Input );

  inputProps = _.defaults( {}, inputProps, Input.defaultProps );

  return _.isEqual( value, Input.getEmptyValue( inputProps ) );

};

const joinClassNames = function( fieldClassName, inputClassName ) {

  if ( ! fieldClassName ) return inputClassName;

  if ( ! inputClassName ) return fieldClassName;

  return [ fieldClassName, inputClassName ];

};

const joinIds = function( fieldId, inputId ) {

  if ( ! fieldId ) return inputId;

  if ( ! inputId ) return fieldId;

  return `${ fieldId } ${ inputId }`;

};


@Mixin.mix

export default class Field extends React.Component {

  static displayName = 'Field';

  static mixins = [

    ReactoidMixin( {

      id: true,

      classes: {

        '-label': '',

        '-invalid': '',

        '-status': '',

        '-description': '',

        '-details': '',

        '-value': '',

        '-focused': '',

        '-readonly': '',

        '-disabled': '',

        '-required': '',

        wrapper: '',

        input: '',

        label: '',

        error: '',

        status: '',

        description: '',

        details: '',

        soul: '',

      },

      slots: {

        body( that, slotArgs, slotProps ) {

          return (

            <React.Fragment>

              { slotArgs.label }

              <div className={ that.classed( 'wrapper' ) }>

                { slotArgs.input }

              </div>

              { slotArgs.soul }

              { slotArgs.error }

              { slotArgs.status }

              { slotArgs.description }

              { slotArgs.details }

            </React.Fragment>

          );

        },

      },

      Components: { Label, CustomInputSoul },

    } ),

    FocusMixin(),

  ];

  static propTypes = {

    children: PropTypes.element.isRequired,

    label: PropTypes.node,

    status: PropTypes.node,

    description: PropTypes.node,

    details: PropTypes.node,

    name: PropTypes.string,

    stringify: PropTypes.func, // ( value: mixed, that: mixed ) => string

    jsonType: InputShared.PropTypes.jsonType,

  };

  static defaultProps = {

    stringify: ( value ) => _.isString( value ) ? value : JSON.stringify( value ),

    jsonType: 'auto',

  };

  getInitialState() {

    let Input = this.props.children.type;

    let inputProps = this.props.children.props;


    return {

      value: getInitialValue( Input, inputProps ),

      error: '',

    };

  }

  componentWillReceiveProps( nextProps ) {

    let prevInput = this.props.children.type;

    let prevInputProps = this.props.children.props;

    let nextInput = nextProps.children.type;

    let nextInputProps = nextProps.children.props;


    if ( nextInput === prevInput ) {

      let nextValue = nextInputProps.value;

      if ( nextValue === undefined ) return;

      let prevValue = prevInputProps.value;

      if ( _.isEqual( nextValue, prevValue ) ) return;

      this.setValue( { value: nextValue } );

    } else {

      let nextValue = getInitialValue( nextInput, nextInputProps );

      this.setValue( { value: nextValue, error: '' } );

    }

  }

  saveInputRef( node ) {

    this.ref( 'input' )( node );

  }

  getLabelFor = () => {

    return this.refs.input;

  }

  clickLabelFor( lable, input ) {

    input.onLabelClick();

  }

  onChange( value ) {

    if ( this.props.children.props.value !== undefined ) return;

    this.setState( { value } );

  }

  onValidation( error ) {

    this.setState( { error } );

  }

  render() {

    let { Label, CustomInputSoul } = this.props.Components;

    let { props: fieldProps, state } = this;

    let { props: inputProps, type: Input } = fieldProps.children;


    let label = fieldProps.label;

    let error = state.error;

    let status = state.status;

    let description = fieldProps.description;

    let details = fieldProps.details;


    let value = state.value;

    let filled = ! isEmptytValue( Input, inputProps, value );

    let focused = this.isFocused();

    let readonly = inputProps.readOnly;

    let disabled = inputProps.disabled;

    let required = inputProps.required;


    let body = this.renderBody( {

      label: (

        <Label

          id={ this.id( 'label' ) }

          className={ this.classed( 'label' ) }

          htmlFor={ this.getLabelFor }

          clickFor={ this.callbacks( 'clickLabelFor' ) }

          children={ label }

        />

      ),

      input: (

        React.cloneElement( fieldProps.children, {

          ref: this.callbacks( 'saveInputRef, props.children.ref' ),

          className: joinClassNames( this.classed( 'input' ), inputProps.className ),

          'aria-labelledby': joinIds( label && this.id( 'label' ), inputProps[ 'aria-labelledby' ] ),

          'aria-errormessage': joinIds( error && this.id( 'error' ), inputProps[ 'aria-errormessage' ] ),

          'aria-controls': joinIds( status && this.id( 'status' ), inputProps[ 'aria-controls' ] ),

          'aria-describedby': joinIds( description && this.id( 'description' ), inputProps[ 'aria-describedby' ] ),

          'aria-details': joinIds( details && this.id( 'details' ), inputProps[ 'aria-details' ] ),

          onChange: this.callbacks( 'onChange, props.children.onChange' ),

          onValidation: this.callbacks( 'onValidation, props.children.onValidation' ),

        } )

      ),

      soul: (

        <CustomInputSoul

          className={ this.classed( 'soul' ) }

          name={ fieldProps.name }

          value={ fieldProps.stringify( value ) }

          validity={ error }

          disabled={ disabled }

          jsonType={ fieldProps.jsonType }

          onFocus={ this }

        />

      ),

      error: <div id={ this.id( 'error' ) } className={ this.classed( 'error' ) } children={ error } />,

      status: <div id={ this.id( 'status' ) } className={ this.classed( 'status' ) } children={ status } />,

      description: <div id={ this.id( 'description' ) } className={ this.classed( 'description' ) } children={ description } />,

      details: <div id={ this.id( 'details' ) } className={ this.classed( 'details' ) } children={ details } />,

    } );


    return (

      <div

        { ...this.omitProps() }

        className={ this.classed( '', { label, invalid: error, status, description, details, value: filled, focused, readonly, disabled, required } ) }

        onFocus={ this.callbacks( 'onFocusGain, props.onFocus' ) }

        onBlur={ this.callbacks( 'onFocusLoss, props.onBlur' ) }

        children={ body }

      />

    );

  }

}
