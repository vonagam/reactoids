@Mixin.mix

export default class Select extends React.Component {

  static displayName = 'Select';

  static mixins = [

    ReactoidMixin( {

      classes: {

        '-multiple': '',

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

    OptionsInputMixin( {

      valueType: PropTypes.string,

      emptyValue: '',

      optionsMode( props ) {

        return props.multiple ? 'array' : 'single';

      },

      validateValue( that, value ) {

        if ( that.props.required && that.isEmptyValue( value ) ) return that.stringed( 'error.required' );

      },

      onValidation( that, message ) {

        that.refs.dom.setCustomValidity( message );

      },

    } ),

  ];

  static propTypes = {

    multiple: PropTypes.bool,

    placeholder: PropTypes.string,

    jsonType: PropTypes.string,

  };

  static defaultProps = {

    placeholder: '',

    jsonType: 'auto',

  };

  onChange( event ) {

    let value;

    if ( this.props.multiple ) {

      value = _.map( _.filter( event.target.options, 'selected' ), 'value' );

    } else {

      value = event.target.value;

    }

    this.setValue( value );

  }

  render() {

    let { props, state } = this;

    let value = this.getValue();

    let filled = ! this.isEmptyValue( value );

    let options = this.getOptions();

    let error = this.getValueError();

    let focused = this.isFocused();

    let multiple = props.multiple;

    let readonly = props.readOnly;

    let disabled = props.disabled;

    let required = props.required;


    return (

      <select

        ref={ this.ref( 'dom' ) }

        { ...this.omitProps() }

        className={ this.classed( '', { multiple, value: filled, error, focused, readonly, disabled, required } ) }

        value={ value }

        multiple={ multiple }

        readOnly={ readonly }

        disabled={ disabled }

        required={ required }

        aria-invalid={ Boolean( error ) || undefined }

        data-value-type={ props.jsonType }

        onChange={ this.callback( 'onChange' ) }

        onFocus={ this.callback( 'onFocusGain, props.onFocus' ) }

        onBlur={ this.callback( 'onFocusLoss, props.onBlur' ) }

      >

        {

          ( props.allowBlank && ! multiple ) ?

            <option className={ this.classed( 'option', { blank: true, selected: ! filled } ) } children={ props.placeholder } />

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
