// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea


@Mixin.mix

export default class Textarea extends React.Component {

  static displayName = 'Textarea';

  static mixins = [

    ReactoidMixin( {

      classes: {

        '-value': '',

        '-invalid': '',

        '-focused': '',

        '-readonly': '',

        '-disabled': '',

        '-required': '',

      },

      strings: [ 'invalid.required' ],

    } ),

    InputMixin( {

      valueType: PropTypes.string,

      emptyValue: '',

      validateValue( that, value ) {

        if ( that.props.required && that.isEmptyValue( value ) ) return that.stringed( 'invalid.required' );

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

    jsonType: InputShared.PropTypes.jsonType,

  };

  static defaultProps = {

    jsonType: 'string',

  };

  render() {

    let { props } = this;

    let value = this.getValue().toString();

    let filled = ! this.isEmptyValue( value );

    let invalid = this.getValueValidity();

    let focused = this.isFocused();

    let readonly = props.readOnly;

    let disabled = props.disabled;

    let required = props.required;


    return (

      <textarea

        ref={ this.ref( 'dom' ) }

        { ...this.omitProps() }

        className={ this.classed( '', { value: filled, invalid, focused, readonly, disabled, required } ) }

        value={ value }

        readOnly={ readonly }

        disabled={ disabled }

        required={ required }

        aria-invalid={ Boolean( invalid ) || undefined }

        data-value-type={ props.jsonType }

        onChange={ this.callbacks( 'onChange' ) }

        onFocus={ this.callbacks( 'onFocusGain, props.onBlur' ) }

        onBlur={ this.callbacks( 'onBlur, onFocusLoss, props.onBlur' ) }

      />

    );

  }

}
