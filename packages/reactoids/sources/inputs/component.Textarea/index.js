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

        if ( that.props.required && value !== '' ) return that.stringed( 'error.required' );

      },

      setCustomValidity( that, message ) {

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

    let error = this.getValueError();

    let focused = this.isFocused();

    let filled = value !== '';

    let readonly = props.readOnly;

    let required = props.required;

    let disabled = props.disabled;


    return (

      <textarea

        ref={ this.ref( 'dom' ) }

        { ...this.omitProps() }

        className={ this.classed( '', { value: filled, error, focused, readonly, disabled, required } ) }

        value={ value }

        readOnly={ readonly }

        required={ required }

        disabled={ disabled }

        data-value-type={ props.jsonType }

        onChange={ this.callback( 'onChange' ) }

        onFocus={ this.callback( 'onFocusGain, props.onBlur' ) }

        onBlur={ this.callback( 'onBlur, onFocusLoss, props.onBlur' ) }

      />

    );

  }

}
