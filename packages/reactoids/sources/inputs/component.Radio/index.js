// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio


@Mixin.mix

export default class Radio extends React.Component {

  static displayName = 'Radio';

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

    } ),

    InputMixin( {

      valueType: PropTypes.bool,

      emptyValue: false,

      onValidation( that, message ) {

        that.refs.dom.setCustomValidity( message );

      },

    } ),

  ];

  static propTypes = {

    mapping: PropTypes.any,

    jsonType: InputShared.PropTypes.jsonType,

  };

  static defaultProps = {

    jsonType: 'auto',

  };

  toggle() {

    this.setValue( ! this.getValue() );

  }

  onClick( event ) {

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

    let { props } = this;

    let value = this.getValue();

    let filled = ! this.isEmptyValue( value );

    let error = this.getValueError();

    let focused = this.isFocused();

    let readonly = props.readOnly;

    let disabled = props.disabled;

    let required = props.required;


    return (

      <input

        ref={ this.ref( 'dom' ) }

        { ...this.omitProps() }

        className={ this.classed( '', { value: filled, error, focused, readonly, disabled, required } ) }

        type='radio'

        value={ props.mapping }

        checked={ value }

        readOnly={ readonly }

        disabled={ disabled }

        required={ required }

        aria-invalid={ Boolean( error ) || undefined }

        data-value-type={ props.jsonType }

        onClick={ this.callbacks( 'onClick, props.onClick' ) }

        onKeyDown={ this.callbacks( 'onKeyDown, props.onKeyDown' ) }

        onChange={ _.noop }

        onFocus={ this.callbacks( 'onFocusGain, props.onFocus' ) }

        onBlur={ this.callbacks( 'onFocusLoss, props.onBlur' ) }

      />

    );

  }

}
