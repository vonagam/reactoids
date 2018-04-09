// https://w3c.github.io/aria/#button
// https://www.w3.org/TR/wai-aria-practices-1.1/#button


@Mixin.mix

export default class AriaToggleButton extends React.Component {

  static displayName = 'AriaToggleButton';

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

        role='button'

        aria-pressed={ indeterminate ? 'mixed' : value.toString() }

        aria-readonly={ readonly }

        aria-disabled={ disabled }

        aria-invalid={ Boolean( error ) }

        aria-required={ required }

        tabIndex={ disabled ? '-1' : props.tabIndex }

        onClick={ this.callback( 'onClick, props.onClick' ) }

        onKeyDown={ this.callback( 'onKeyDown, props.onKeyDown' ) }

        onFocus={ this.callback( 'onFocusGain, props.onFocus' ) }

        onBlur={ this.callback( 'onFocusLoss, props.onBlur' ) }

      >

        <CustomInputSoul

          className={ this.classed( 'soul' ) }

          name={ props.name }

          value={ props.mapping[ +value ] }

          error={ error }

          disabled={ disabled }

          jsonType={ props.jsonType }

          onFocus={ this }


        />

      </div>

    );

  }

}
