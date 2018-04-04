// https://w3c.github.io/aria/#radiogroup


@Mixin.mix

export default class AriaRadioGroup extends React.Component {

  static displayName = 'AriaRadioGroup';

  static mixins = [

    ReactoidMixin( {

      classes: {

        '-value': '',

        '-error': '',

        '-focused': '',

        '-readonly': '',

        '-disabled': '',

        '-required': '',

        'soul': '',

        option: {

          '-selected': '',

          '-focused': '',

        },

      },

      strings: [ 'error.required' ],

    } ),

    SingleOptionInputMixin( {

      validateValue( that, value ) {

        if ( that.props.required && value === undefined ) return that.stringed( 'error.required' );

      },

    } ),

  ];

  static propTypes = {

    name: PropTypes.string,

    required: PropTypes.bool,

    tabIndex: PropTypes.oneOfType( [ PropTypes.string, PropTypes.number ] ),

    jsonType: PropTypes.string,

  };

  static defaultProps = {

    tabIndex: '0',

    jsonType: 'auto',

  };

  getInitialState() {

    return { focusedKey: undefined };

  }

  componentWillReceiveProps( nextProps ) {

    if ( nextProps.disabled && ! this.props.disabled ) {

      if ( _.includes( this.refs, document.activeElement ) ) {

        document.activeElement.blur();

        this.setState( { focusedKey: undefined } );

      }

    }

  }

  toggleOption( option ) {

    if ( option.selected ) {

      if ( this.props.allowBlank ) {

        this.setValue( undefined );

      }

    } else {

      this.setValue( option.value );

    }

  }

  onOptionClick( option, index ) {

    if ( this.props.disabled ) return;

    this.toggleOption( option );

    this.refs[ index ].focus();

  }

  onOptionKeyDown( option, index, options, event ) {

    if ( event.target !== this.refs[ index ] ) return;

    if ( event.altKey || event.ctrlKey || event.metaKey ) return;

    if ( event.key === ' ' ) {

      event.preventDefault();

      this.toggleOption( option );

    }

    if ( event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'ArrowLeft' || event.key === 'ArrowRight' ) {

      event.preventDefault();

      let delta = event.key === 'ArrowDown' || event.key === 'ArrowRight' ? +1 : -1;

      let focusedIndex = ( index + delta ) % _.size( options );

      this.refs[ focusedIndex ].focus();

    }

  }

  onOptionFocus( option ) {

    this.setState( { focusedKey: option.key } );

  }

  onOptionBlur( option ) {

    this.setState( { focusedKey: undefined } );

  }

  render() {

    let { props, state } = this;

    let value = this.getValue();

    let options = this.getOptions();

    let error = this.getValueError();

    let focused = this.isFocused();

    let readonly = props.readOnly;

    let disabled = props.disabled;

    let required = props.required;


    let focusedIndex = state.focusedKey === undefined ? -1 : _.findIndex( options, { key: state.focusedKey } );

    let selectedIndex = value === undefined ? -1 : _.findIndex( options, { selected: true } );

    let tabbableIndex = disabled ? -1 : ( focusedIndex > -1 ? focusedIndex : ( selectedIndex > -1 ? selectedIndex : 0 ) );


    return (

      <div

        { ...this.omitProps() }

        className={ this.classed( '', { value: value !== undefined, error, focused, readonly, disabled, required } ) }

        role='radiogroup'

        aria-readonly={ readonly }

        aria-disabled={ disabled }

        aria-invalid={ Boolean( error ) }

        aria-required={ required }

        onFocus={ this.callback( 'onFocusGain, props.onFocus' ) }

        onBlur={ this.callback( 'onFocusLoss, props.onBlur' ) }

      >

        {

          _.map( options, ( option, index ) =>

            <div

              key={ option.key }

              ref={ this.ref( index ) }

              className={ this.classed( 'option', { selected: option.selected, focused: focusedIndex === index } ) }

              role='radio'

              aria-checked={ option.selected }

              aria-disabled={ disabled }

              tabIndex={ tabbableIndex === index ? props.tabIndex : '-1' }

              onClick={ _.bind( this.onOptionClick, this, option, index ) }

              onKeyDown={ _.bind( this.onOptionKeyDown, this, option, index, options ) }

              onFocus={ _.bind( this.onOptionFocus, this, option ) }

              onBlur={ _.bind( this.onOptionBlur, this, option ) }

              children={ option.label }

            />

          )

        }

        <CustomInputSoul

          className={ this.classed( 'soul' ) }

          input={ this }

          name={ props.name }

          value={ value }

          error={ error }

          disabled={ disabled }

          jsonType={ props.jsonType }

        />

      </div>

    );

  }

}
