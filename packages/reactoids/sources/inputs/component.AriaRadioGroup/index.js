// https://w3c.github.io/aria/#radiogroup
// https://www.w3.org/TR/wai-aria-practices-1.1/#radiobutton


const FOCUS_KEYS = {

  ArrowUp: ( index, options ) => ( options.length + index - 1 ) % options.length,

  ArrowLeft: ( index, options ) => ( options.length + index - 1 ) % options.length,

  ArrowDown: ( index, options ) => ( options.length + index + 1 ) % options.length,

  ArrowRight: ( index, options ) => ( options.length + index + 1 ) % options.length,

  Home: ( index, options ) => 0,

  End: ( index, options ) => options.length - 1,

};


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

        option: {

          '-selected': '',

          '-focused': '',

        },

        soul: '',

      },

      strings: [ 'error.required' ],

      Components: { CustomInputSoul },

    } ),

    SingleOptionInputMixin( {

      validateValue( that, value ) {

        if ( that.props.required && that.isDefaultValue( value ) ) return that.stringed( 'error.required' );

      },

      onDisable( that ) {

        if ( _.includes( this.refs.dom.childNodes, document.activeElement ) ) {

          document.activeElement.blur();

        }

      },

    } ),

  ];

  static propTypes = {

    selectFocus: PropTypes.bool,

    name: PropTypes.string,

    tabIndex: PropTypes.oneOfType( [ PropTypes.string, PropTypes.number ] ),

    jsonType: PropTypes.string,

    onInvalid: PropTypes.func,

  };

  static defaultProps = {

    selectFocus: false,

    tabIndex: '0',

    jsonType: 'auto',

  };

  getInitialState() {

    return { focusedKey: undefined };

  }

  onOptionClick( option, index, options, event ) {

    if ( this.props.disabled ) return;

    this.toggleOption( option );

    event.currentTarget.focus();

  }

  onOptionKeyDown( option, index, options, event ) {

    if ( event.currentTarget !== event.target ) return;

    if ( event.altKey || event.ctrlKey || event.metaKey ) return;

    if ( event.key === ' ' ) {

      event.preventDefault();

      this.toggleOption( option );

    }

    if ( FOCUS_KEYS[ event.key ] ) {

      event.preventDefault();

      let focusedIndex = FOCUS_KEYS[ event.key ]( index, options );

      this.refs.dom.childNodes[ focusedIndex ].focus();

    }

  }

  onOptionFocus( option, index, options, event ) {

    if ( event.currentTarget !== event.target ) return;

    this.setState( { focusedKey: option.key } );

    if ( this.props.selectFocus ) this.toggleOption( option, true );

  }

  onOptionBlur( option, index, options, event ) {

    if ( event.currentTarget !== event.target ) return;

    this.setState( { focusedKey: undefined } );

  }

  onOptionEvent( event ) {

    let options = this.getOptions();

    let index = Number( event.currentTarget.getAttribute( 'data-index' ) );

    let option = options[ index ];

    switch( event.type ) {

      case 'click': this.onOptionClick( option, index, options, event ); break;

      case 'keydown': this.onOptionKeyDown( option, index, options, event ); break;

      case 'focus': this.onOptionFocus( option, index, options, event ); break;

      case 'blur': this.onOptionBlur( option, index, options, event ); break;

    }

  }

  render() {

    let { CustomInputSoul } = this.props.Components;

    let { props, state } = this;

    let value = this.getValue();

    let filled = ! this.isDefaultValue( value );

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

        ref={ this.ref( 'dom' ) }

        { ...this.omitProps() }

        className={ this.classed( '', { value: filled, error, focused, readonly, disabled, required } ) }

        role='radiogroup'

        aria-readonly={ readonly }

        aria-disabled={ disabled }

        aria-required={ required }

        aria-invalid={ Boolean( error ) || undefined }

        onFocus={ this.callback( 'onFocusGain, props.onFocus' ) }

        onBlur={ this.callback( 'onFocusLoss, props.onBlur' ) }

      >

        {

          _.map( options, ( option, index ) =>

            <div

              key={ option.key }

              className={ this.classed( 'option', { selected: option.selected, focused: focusedIndex === index } ) }

              role='radio'

              aria-checked={ option.selected }

              aria-disabled={ disabled }

              data-index={ index }

              tabIndex={ tabbableIndex === index ? props.tabIndex : '-1' }

              onClick={ this.callback( 'onOptionEvent' ) }

              onKeyDown={ this.callback( 'onOptionEvent' ) }

              onFocus={ this.callback( 'onOptionEvent' ) }

              onBlur={ this.callback( 'onOptionEvent' ) }

              children={ option.label }

            />

          )

        }

        <CustomInputSoul

          className={ this.classed( 'soul' ) }

          name={ props.name }

          value={ value }

          error={ error }

          disabled={ disabled }

          jsonType={ props.jsonType }

          onFocus={ this }

          onInvalid={ props.onInvalid }

        />

      </div>

    );

  }

}
