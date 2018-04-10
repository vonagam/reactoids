// https://w3c.github.io/aria/#checkbox
// https://www.w3.org/TR/2017/NOTE-wai-aria-practices-1.1-20171214/#checkbox


@Mixin.mix

export default class AriaCheckbox extends React.Component {

  static displayName = 'AriaCheckbox';

  static mixins = [

    ReactoidMixin( {

      classes: {

        '-value': '',

        '-indeterminate': '',

        '-error': '',

        '-focused': '',

        '-readonly': '',

        '-disabled': '',

        '-required': '',

        'soul': '',

      },

      strings: [ 'error.required' ],

      Components: { CustomInputSoul },

    } ),

    InputMixin( {

      valueType: PropTypes.bool,

      defaultValue: false,

      validateValue( that, value ) {

        if ( that.props.required && value !== true ) return that.stringed( 'error.required' );

      },

    } ),

  ];

  static propTypes = {

    indeterminate: PropTypes.bool,

    mapping: PropTypes.array,

    name: PropTypes.string,

    required: PropTypes.bool,

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

    let { props } = this;

    let value = this.getValue();

    let error = this.getValueError();

    let focused = this.isFocused();

    let indeterminate = props.indeterminate;

    let readonly = props.readOnly;

    let disabled = props.disabled;

    let required = props.required;


    return (

      <div

        ref={ this.ref( 'dom' ) }

        { ...this.omitProps() }

        className={ this.classed( '', { value, indeterminate, error, focused, readonly, disabled, required } ) }

        role='checkbox'

        aria-checked={ indeterminate ? 'mixed' : value.toString() }

        aria-readonly={ readonly }

        aria-disabled={ disabled }

        aria-required={ required }

        aria-invalid={ Boolean( error ) }

        tabIndex={ disabled ? '-1' : props.tabIndex }

        onClick={ this.callback( 'onClick, props.onClick' ) }

        onKeyDown={ this.callback( 'onKeyDown, props.onKeyDown' ) }

        onFocus={ this.callback( 'onFocusGain, props.onFocus' ) }

        onBlur={ this.callback( 'onFocusLoss, props.onBlur' ) }

      >

        <props.Components.CustomInputSoul

          className={ this.classed( 'soul' ) }

          name={ props.name }

          value={ props.mapping[ +value ] }

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
