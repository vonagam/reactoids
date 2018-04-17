@Mixin.mix

export default class Input extends React.Component {

  static displayName = 'Input';

  static mixins = [

    ReactoidMixin( {

      classes: {

        '-type=': [],

        '-value': '',

        '-error': '',

        '-focused': '',

        '-readonly': '',

        '-disabled': '',

        '-required': '',

      },

      strings: [ 'error.required' ],

    } ),

    InputMixin( {

      emptyValue: '',

      validateValue( that, value ) {

        if ( that.props.required && that.isEmptyValue( value ) ) return that.stringed( 'error.required' );

      },

      onValidation( that, message ) {

        that.refs.dom.setCustomValidity( message );

      },

    } ),

  ];

  static propTypes = {

    type: PropTypes.string,

    jsonType: PropTypes.string,

    onEnter: PropTypes.func,

  };

  static defaultProps = {

    type: 'text',

    jsonType: 'auto',

  };

  onChange( event ) {

    this.setTempValue( event.target.value );

  }

  onBlur( event ) {

    this.setValue( event.target.value );

  }

  onKeyDown( event ) {

    if ( event.key === 'Enter' ) {

      event.target.blur();

      if ( this.props.onEnter ) this.props.onEnter( enter );

    }

  }

  render() {

    let { props } = this;

    let value = this.getValue();

    let filled = ! this.isEmptyValue( value );

    let error = this.getValueError();

    let focused = this.isFocused();

    let type = props.type;

    let readonly = props.readOnly;

    let disabled = props.disabled;

    let required = props.required;


    return (

      <input

        ref={ this.ref( 'dom' ) }

        { ...this.omitProps() }

        className={ this.classed( '', { type, value: filled, error, focused, readonly, disabled, required } ) }

        type={ type }

        value={ value }

        readOnly={ readonly }

        disabled={ disabled }

        required={ required }

        aria-invalid={ Boolean( error ) || undefined }

        data-value-type={ props.jsonType }

        onChange={ this.callbacks( 'onChange' ) }

        onFocus={ this.callbacks( 'onFocusGain, props.onFocus' ) }

        onBlur={ this.callbacks( 'onBlur, onFocusLoss, props.onBlur' ) }

        onKeyDown={ this.callbacks( 'onKeyDown, props.onKeyDown' ) }

      />

    );

  }

}
