// https://w3c.github.io/aria/#button


const INDEXES = {

  false: 0,

  true: 1,

  mixed: 2,

};


@Mixin.mix

export default class AriaToggleButton extends React.Component {

  static displayName = 'AriaToggleButton';

  static mixins = [

    ReactoidMixin( {

      classes: {

        '-value=': [ 'false', 'true', 'mixed' ],

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

      valueType: PropTypes.oneOf( [ false, true, 'false', 'true', 'mixed' ] ),

      defaultValue: false,

      validateValue( that, value ) {

        if ( that.props.required && value.toString() !== 'true' ) return that.stringed( 'error.required' );

      },

    } ),

  ];

  static propTypes = {

    name: PropTypes.string,

    required: PropTypes.bool,

    tabIndex: PropTypes.oneOfType( [ PropTypes.string, PropTypes.number ] ),

    mapping: PropTypes.array,

    jsonType: PropTypes.string,

  };

  static defaultProps = {

    tabIndex: '0',

    mapping: [ 'false', 'true', 'false' ],

    jsonType: 'boolean',

  };

  toggle() {

    this.setValue( this.getValue().toString() !== 'true' );

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

    let value = this.getValue().toString();

    let error = this.getValueError();

    let focused = this.isFocused();

    let readonly = props.readOnly;

    let disabled = props.disabled;

    let required = props.required;


    return (

      <div

        ref={ this.ref( 'dom' ) }

        { ...this.omitProps() }

        className={ this.classed( '', { value, error, focused, readonly, disabled, required } ) }

        role='button'

        aria-pressed={ value }

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

          value={ props.mapping[ INDEXES[ value ] ] }

          error={ error }

          disabled={ disabled }

          onFocus={ this }

          jsonType={ props.jsonType }

        />

      </div>

    );

  }

}
