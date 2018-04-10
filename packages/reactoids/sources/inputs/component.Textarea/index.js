@Mixin.mix

export default class Textarea extends React.Component {

  static displayName = 'Textarea';

  static mixins = [

    ReactoidMixin( {

      classes: {

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

      valueType: PropTypes.string,

      defaultValue: '',

      validateValue( that, value ) {

        if ( that.props.required && that.isDefaultValue( value ) ) return that.stringed( 'error.required' );

      },

      onValidation( that, message ) {

        that.refs.dom.setCustomValidity( message );

      },

    } ),

  ];

  onChange( event ) {

    this.setTempValue( event.target.value );

  }

  onBlur( event ) {

    this.setValue( event.target.value );

  }

  static propTypes = {

    required: PropTypes.bool,

    jsonType: PropTypes.string,

  };

  static defaultProps = {

    jsonType: 'string',

  };

  render() {

    let { props } = this;

    let value = this.getValue().toString();

    let filled = ! this.isDefaultValue( value );

    let error = this.getValueError();

    let focused = this.isFocused();

    let readonly = props.readOnly;

    let disabled = props.disabled;

    let required = props.required;


    return (

      <textarea

        ref={ this.ref( 'dom' ) }

        { ...this.omitProps() }

        className={ this.classed( '', { value: filled, error, focused, readonly, disabled, required } ) }

        value={ value }

        readOnly={ readonly }

        disabled={ disabled }

        required={ required }

        aria-invalid={ Boolean( error ) }

        data-value-type={ props.jsonType }

        onChange={ this.callback( 'onChange' ) }

        onFocus={ this.callback( 'onFocusGain, props.onBlur' ) }

        onBlur={ this.callback( 'onBlur, onFocusLoss, props.onBlur' ) }

      />

    );

  }

}
