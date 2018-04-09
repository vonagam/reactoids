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

      onValidation( that, message ) {

        that.refs.dom.setCustomValidity( message );

      },

    } ),

  ];

  static propTypes = {

    indeterminate: PropTypes.bool,

    mapping: PropTypes.string,

    required: PropTypes.bool,

    jsonType: PropTypes.string,

  };

  static defaultProps = {

    mapping: 'true',

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

    let error = this.getValueError();

    let focused = this.isFocused();

    let indeterminate = props.indeterminate;

    let readonly = props.readOnly;

    let disabled = props.disabled;

    let required = props.required;


    return (

      <input

        ref={ this.ref( 'dom' ) }

        { ...this.omitProps() }

        className={ this.classed( '', { value, indeterminate, error, focused, readonly, disabled, required } ) }

        type='checkbox'

        value={ props.mapping }

        checked={ value }

        readOnly={ readonly }

        disabled={ disabled }

        required={ required }

        aria-invalid={ Boolean( error ) }

        data-value-type={ props.jsonType }

        onChange={ this.callback( 'onChange' ) }

        onFocus={ this.callback( 'onFocusGain, props.onFocus' ) }

        onBlur={ this.callback( 'onFocusLoss, props.onBlur' ) }

      />

    );

  }

}
