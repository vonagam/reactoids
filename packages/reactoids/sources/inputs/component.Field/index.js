const getInitialValue = function( Input, inputProps ) {

  if ( inputProps.value !== undefined ) return inputProps.value;

  if ( inputProps.defaultValue !== undefined ) return inputProps.defaultValue;

  return Input.defaultProps.defaultValue;

};

const isDefaultValue = function( Input, value ) {

  return _.isEqual( value, Input.defaultProps.defaultValue );

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

        '-error': '',

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

    jsonType: PropTypes.string,

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

    let nextValue = nextProps.children.props.value;

    if ( nextValue === undefined ) return;

    let prevValue = this.props.children.props.value;

    if ( _.isEqual( nextValue, prevValue ) ) return;

    this.setValue( { value: nextValue } );

  }

  saveInputRef( node ) {

    this.ref( 'input' )( node );

  }

  onLabelClick() {

    this.refs.input.onLabelClick();

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

    let filled = ! isDefaultValue( Input, value );

    let focused = this.isFocused();

    let readonly = inputProps.readOnly;

    let disabled = inputProps.disabled;

    let required = inputProps.required;


    return (

      <div

        { ...this.omitProps() }

        className={ this.classed( '', { label, error, status, description, details, value: filled, focused, readonly, disabled, required } ) }

        onFocus={ this.callback( 'onFocusGain, props.onFocus' ) }

        onBlur={ this.callback( 'onFocusLoss, props.onBlur' ) }

      >

        <Label id={ this.id( 'label' ) } className={ this.classed( 'label' ) } onClick={ this.callback( 'onLabelClick' ) } children={ label } />

        <div className={ this.classed( 'wrapper' ) }>

          {

            React.cloneElement( fieldProps.children, {

              ref: this.callback( 'saveInputRef, props.children.ref' ),

              className: joinClassNames( this.classed( 'input' ), inputProps.className ),

              'aria-labelledby': joinIds( label && this.id( 'label' ), inputProps[ 'aria-labelledby' ] ),

              'aria-errormessage': joinIds( error && this.id( 'error' ), inputProps[ 'aria-errormessage' ] ),

              'aria-controls': joinIds( status && this.id( 'status' ), inputProps[ 'aria-controls' ] ),

              'aria-describedby': joinIds( description && this.id( 'description' ), inputProps[ 'aria-describedby' ] ),

              'aria-details': joinIds( details && this.id( 'details' ), inputProps[ 'aria-details' ] ),

              onChange: this.callback( 'onChange, props.children.onChange' ),

              onValidation: this.callback( 'onValidation, props.children.onValidation' ),

            } )

          }

        </div>

        {

          ( fieldProps.name ) ?

            <CustomInputSoul

              className={ this.classed( 'soul' ) }

              name={ fieldProps.name }

              value={ fieldProps.stringify( value ) }

              error={ error }

              disabled={ disabled }

              jsonType={ fieldProps.jsonType }

              onFocus={ this }

            />

          : null

        }

        <div id={ this.id( 'error' ) } className={ this.classed( 'error' ) } children={ error } />

        <div id={ this.id( 'status' ) } className={ this.classed( 'status' ) } children={ status } />

        <div id={ this.id( 'description' ) } className={ this.classed( 'description' ) } children={ description } />

        <div id={ this.id( 'details' ) } className={ this.classed( 'details' ) } children={ details } />

      </div>

    );

  }

}
