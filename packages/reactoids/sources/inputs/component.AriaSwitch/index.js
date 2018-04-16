// https://w3c.github.io/aria/#switch


@Mixin.mix

export default class AriaSwitch extends React.Component {

  static displayName = 'AriaSwitch';

  static mixins = [

    ReactoidMixin( {

      classes: {

        '-value': '',

        '-error': '',

        '-focused': '',

        '-readonly': '',

        '-disabled': '',

        '-required': '',

        soul: '',

      },

      strings: [ 'error.required' ],

      Components: { CustomInputSoul },

    } ),

    InputMixin( {

      valueType: PropTypes.bool,

      emptyValue: false,

      validateValue( that, value ) {

        if ( that.props.required && that.isEmptyValue( value ) ) return that.stringed( 'error.required' );

      },

    } ),

  ];

  static propTypes = {

    mapping: PropTypes.array,

    name: PropTypes.string,

    tabIndex: PropTypes.oneOfType( [ PropTypes.string, PropTypes.number ] ),

    jsonType: PropTypes.string,

    onInvalid: PropTypes.func,

  };

  static defaultProps = {

    mapping: [ 'false', 'true' ],

    tabIndex: '0',

    jsonType: 'boolean',

  };

  toggle() {

    this.setValue( ! this.getValue() );

  }

  onClick() {

    this.toggle();

  }

  onKeyDown( event ) {

    if ( event.target !== this.refs.dom ) return;

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

    let error = this.getValueError();

    let focused = this.isFocused();

    let readonly = props.readOnly;

    let disabled = props.disabled;

    let required = props.required;


    let formValue = props.mapping[ +value ];

    let formName = formValue === undefined ? undefined : props.name;


    return (

      <div

        ref={ this.ref( 'dom' ) }

        { ...this.omitProps() }

        className={ this.classed( '', { value: filled, error, focused, readonly, disabled, required } ) }

        role='switch'

        aria-checked={ value.toString() }

        aria-readonly={ readonly }

        aria-disabled={ disabled }

        aria-required={ required }

        aria-invalid={ Boolean( error ) || undefined }

        tabIndex={ disabled ? undefined : props.tabIndex }

        onClick={ this.callback( 'onClick, props.onClick' ) }

        onKeyDown={ this.callback( 'onKeyDown, props.onKeyDown' ) }

        onFocus={ this.callback( 'onFocusGain, props.onFocus' ) }

        onBlur={ this.callback( 'onFocusLoss, props.onBlur' ) }

      >

        <CustomInputSoul

          className={ this.classed( 'soul' ) }

          name={ formName }

          value={ formValue }

          error={ error }

          disabled={ disabled }

          jsonType={ props.jsonType }

          onFocus={ this }

          onInvalid={ props.onInvalid }

        />

      </div>

    );

  }

}
