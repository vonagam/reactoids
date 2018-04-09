@Mixin.mix

export default class Select extends React.Component {

  static displayName = 'Select';

  static mixins = [

    ReactoidMixin( {

      classes: {

        '-value': '',

        '-error': '',

        '-focused': '',

        '-readonly': '',

        '-disabled': '',

        '-required': '',

        option: {

          '-blank': '',

          '-selected': '',

        },

      },

      strings: [ 'error.required' ],

    } ),

    SingleOptionInputMixin( {

      valueType: PropTypes.string,

      defaultValue: '',

      validateValue( that, value ) {

        if ( that.props.required && value === undefined ) return that.stringed( 'error.required' );

      },

      onValidation( that, message ) {

        that.refs.dom.setCustomValidity( message );

      },

    } ),

  ];

  static propTypes = {

    required: PropTypes.bool,

    jsonType: PropTypes.string,

  };

  static defaultProps = {

    jsonType: 'auto',

  };

  onChange( event ) {

    this.setValue( event.target.value );

  }

  render() {

    let { props, state } = this;

    let value = this.getValue();

    let options = this.getOptions();

    let error = this.getValueError();

    let focused = this.isFocused();

    let filled = ! ( this.props.allowBlank && value === '' );

    let readonly = props.readOnly;

    let disabled = props.disabled;

    let required = props.required;


    return (

      <select

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

        onFocus={ this.callback( 'onFocusGain, props.onFocus' ) }

        onBlur={ this.callback( 'onFocusLoss, props.onBlur' ) }

      >

        {

          ( props.allowBlank ) ?

            <option className={ this.classed( 'option', { blank: true, selected: ! filled } ) } value='' />

          : null

        }

        {

          _.map( options, ( option, index ) =>

            <option

              key={ option.key }

              className={ this.classed( 'option', { selected: option.selected } ) }

              value={ option.value }

              children={ option.label }

            />

          )

        }

      </select>

    );

  }

}
