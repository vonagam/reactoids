const ROLES = {

  checkbox: ( value, indeterminate ) => ( { 'aria-checked': indeterminate ? 'mixed' : value } ),

  radio: ( value, indeterminate ) => ( { 'aria-checked': value } ),

  switch: ( value, indeterminate ) => ( { 'aria-checked': value } ),

  button: ( value, indeterminate ) => ( { 'aria-pressed': indeterminate ? 'mixed' : value } ),

  option: ( value, indeterminate ) => ( { 'aria-selected': value } ),

};


@Mixin.mix

export default class AriaCheck extends React.Component {

  static displayName = 'AriaCheck';

  static mixins = [

    ReactoidMixin( {

      classes: {

        '-value': '',

        '-indeterminate': '',

        '-invalid': '',

        '-focused': '',

        '-readonly': '',

        '-disabled': '',

        '-required': '',

        soul: '',

      },

      strings: [ 'invalid.required' ],

      Components: { CustomInputSoul },

    } ),

    InputMixin( {

      valueType: PropTypes.bool,

      emptyValue: false,

      validateValue( that, value ) {

        if ( that.props.required && that.isEmptyValue( value ) ) return that.stringed( 'invalid.required' );

      },

    } ),

  ];

  static propTypes = {

    Tag: PropTypes.string,

    role: PropTypes.oneOf( _.keys( ROLES ) ).isRequired,

    indeterminate: PropTypes.bool,

    mapping: InputShared.PropTypes.boolMapping,

    name: PropTypes.string,

    tabIndex: InputShared.PropTypes.tabIndex,

    jsonType: InputShared.PropTypes.jsonType,

    children: PropTypes.funced( PropTypes.node ), // ( that: mixed, value: boolean, indeterminate: ?boolean ) => mixed

    onInvalid: PropTypes.func,

  };

  static defaultProps = {

    Tag: 'div',

    mapping: [ 'false', 'true' ],

    tabIndex: '0',

    jsonType: 'boolean',

  };

  toggle() {

    this.setValue( ! this.getValue() );

  }

  onClick( event ) {

    if ( Focus.closestFocusable( event.target, this.dom() ) ) return;

    this.toggle();

  }

  onKeyDown( event ) {

    if ( event.currentTarget !== event.target ) return;

    if ( event.altKey || event.ctrlKey || event.metaKey ) return;

    if ( event.key === ' ' ) {

      event.preventDefault();

      this.toggle();

    }

  }

  render() {

    let { CustomInputSoul } = this.props.Components;

    let { props } = this;

    let value = this.getValue();

    let filled = ! this.isEmptyValue( value );

    let invalid = this.getValueValidity();

    let focused = this.isFocused();

    let indeterminate = props.indeterminate;

    let readonly = props.readOnly;

    let disabled = props.disabled;

    let required = props.required;


    let Tag = props.Tag;


    let formValue = InputShared.mapBoolValue( value, props.mapping );

    let formName = formValue === undefined ? undefined : props.name;


    let roleName = props.role;

    let roleProps = ROLES[ props.role ]( value, indeterminate );


    return (

      <Tag

        { ...this.omitProps() }

        className={ this.classed( '', { value: filled, indeterminate, invalid, focused, readonly, disabled, required } ) }

        role={ roleName }

        { ...roleProps }

        aria-readonly={ readonly }

        aria-disabled={ disabled }

        aria-required={ required }

        aria-invalid={ Boolean( invalid ) || undefined }

        tabIndex={ disabled ? undefined : props.tabIndex }

        onClick={ this.callbacks( 'onClick, props.onClick' ) }

        onKeyDown={ this.callbacks( 'onKeyDown, props.onKeyDown' ) }

        onFocus={ this.callbacks( 'onFocusGain, props.onFocus' ) }

        onBlur={ this.callbacks( 'onFocusLoss, props.onBlur' ) }

      >

        {

          _.funced( props.children, value, indeterminate )

        }

        <CustomInputSoul

          className={ this.classed( 'soul' ) }

          name={ formName }

          value={ formValue }

          validity={ invalid }

          disabled={ disabled }

          jsonType={ props.jsonType }

          onFocus={ this }

          onInvalid={ props.onInvalid }

        />

      </Tag>

    );

  }

}
