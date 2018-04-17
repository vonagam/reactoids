@Mixin.mix

export default class Checkbox extends React.Component {

  static displayName = 'Checkbox';

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

      },

      strings: [ 'error.required' ],

    } ),

    InputMixin( {

      valueType: PropTypes.bool,

      emptyValue: false,

      validateValue( that, value ) {

        if ( that.props.required && that.isEmptyValue( value ) ) return that.stringed( 'error.required' );

      },

      onValidation( that, message ) {

        that.refs.dom.setCustomValidity( message );

      },

      findDOMNode( that ) {

        return that.refs.dom;

      },

    } ),

  ];

  static propTypes = {

    indeterminate: PropTypes.bool,

    mapping: InputShared.PropTypes.boolMapping,

    name: PropTypes.string,

    jsonType: PropTypes.string,

  };

  static defaultProps = {

    mapping: [ 'false', 'true' ],

    jsonType: 'boolean',

  };

  componentDidMount() {

    if ( this.props.indeterminate ) {

      this.refs.dom.indeterminate = this.props.indeterminate;

    }

  }

  componentDidUpdate( prevProps ) {

    if ( this.props.indeterminate !== prevProps.indeterminate ) {

      this.refs.dom.indeterminate = this.props.indeterminate;

    }

  }

  onChange( event ) {

    this.setValue( event.target.checked );

  }

  render() {

    let { props } = this;

    let value = this.getValue();

    let filled = ! this.isEmptyValue( value );

    let error = this.getValueError();

    let focused = this.isFocused();

    let indeterminate = props.indeterminate;

    let readonly = props.readOnly;

    let disabled = props.disabled;

    let required = props.required;


    let formFalseValue = InputShared.mapBoolValue( false, props.mapping );

    let formTrueValue = InputShared.mapBoolValue( true, props.mapping );

    let formFalseName = value === false && formFalseValue !== undefined ? props.name : undefined;

    let formTrueName = props.name;


    return (

      <React.Fragment>

        <input

          type='hidden'

          name={ formFalseName }

          value={ formFalseValue }

          disabled={ disabled }

          data-value-type={ props.jsonType }

        />

        <input

          ref={ this.ref( 'dom' ) }

          { ...this.omitProps() }

          className={ this.classed( '', { value: filled, indeterminate, error, focused, readonly, disabled, required } ) }

          name={ formTrueName }

          type='checkbox'

          value={ formTrueValue }

          checked={ value }

          readOnly={ readonly }

          disabled={ disabled }

          required={ required }

          aria-invalid={ Boolean( error ) || undefined }

          data-value-type={ props.jsonType }

          onChange={ this.callbacks( 'onChange' ) }

          onFocus={ this.callbacks( 'onFocusGain, props.onFocus' ) }

          onBlur={ this.callbacks( 'onFocusLoss, props.onBlur' ) }

        />

      </React.Fragment>

    );

  }

}
