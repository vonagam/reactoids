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

      validationProps: [ 'required' ],

      validateValue( that, value ) {

        if ( that.props.required && that.isDefaultValue( value ) ) return that.stringed( 'error.required' );

      },

      onValidation( that, message ) {

        that.refs.dom.setCustomValidity( message );

      },

    } ),

  ];

  static propTypes = {

    indeterminate: PropTypes.bool,

    mapping: PropTypes.array,

    name: PropTypes.string,

    required: PropTypes.bool,

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

    let filled = ! this.isDefaultValue( value );

    let error = this.getValueError();

    let focused = this.isFocused();

    let indeterminate = props.indeterminate;

    let readonly = props.readOnly;

    let disabled = props.disabled;

    let required = props.required;


    let names = [];

    if ( value === true ) {

      names[ 1 ] = props.name;

    } else if ( props.mapping[ 0 ] !== undefined ) {

      names[ 0 ] = props.name;

    }


    return (

      <React.Fragment>

        <input

          type='hidden'

          name={ names[ 0 ] }

          value={ props.mapping[ 0 ] }

          disabled={ disabled }

          data-value-type={ props.jsonType }

        />

        <input

          ref={ this.ref( 'dom' ) }

          { ...this.omitProps() }

          className={ this.classed( '', { value: filled, indeterminate, error, focused, readonly, disabled, required } ) }

          name={ names[ 1 ] }

          type='checkbox'

          value={ props.mapping[ 1 ] }

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

      </React.Fragment>

    );

  }

}
