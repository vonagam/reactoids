// https://w3c.github.io/aria/#radiogroup
// https://www.w3.org/TR/wai-aria-practices-1.1/#radiobutton


@Mixin.mix

export default class AriaRadioGroup extends React.Component {

  static displayName = 'AriaRadioGroup';

  static mixins = [

    ReactoidMixin( {

      classes: {

        '-value': '',

        '-invalid': '',

        '-focused': '',

        '-readonly': '',

        '-disabled': '',

        '-required': '',

        option: '',

        soul: '',

      },

      strings: [ 'invalid.required' ],

      Components: { AriaRadio, CustomInputSoul },

    } ),

    OptionsInputMixin( {

      optionsMode: 'single',

      validateValue( that, value ) {

        if ( that.props.required && that.isEmptyValue( value ) ) return that.stringed( 'invalid.required' );

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

    tabIndex: InputShared.PropTypes.tabIndex,

    jsonType: InputShared.PropTypes.jsonType,

    onInvalid: PropTypes.func,

  };

  static defaultProps = {

    selectFocus: true,

    tabIndex: '0',

    jsonType: 'auto',

  };

  getInitialState() {

    return { focusedKey: undefined };

  }

  onOptionChange( index, value ) {

    let options = this.getOptions();

    let option = options[ index ];

    this.toggleOption( option, value );

  }

  onOptionKeyDown( index, event ) {

    if ( event.altKey || event.ctrlKey || event.metaKey ) return;

    if ( InputShared.OPTIONS_FOCUS_KEYS[ event.key ] ) {

      event.preventDefault();

      let options = this.getOptions();

      let focusedIndex = InputShared.OPTIONS_FOCUS_KEYS[ event.key ]( index, options );

      Focus.focus( this.refs.dom.childNodes[ focusedIndex ] );

    }

  }

  onOptionFocus( index, event ) {

    let options = this.getOptions();

    let option = options[ index ];

    this.setState( { focusedKey: option.key } );

    if ( this.props.selectFocus ) this.toggleOption( option, true );

  }

  onOptionBlur( index, event ) {

    this.setState( { focusedKey: undefined } );

  }

  onOptionEvent( event ) {

    if ( event.currentTarget !== event.target ) return;

    let index = Number( event.currentTarget.getAttribute( 'data-index' ) );

    switch( event.type ) {

      case 'keydown': this.onOptionKeyDown( index, event ); break;

      case 'focus': this.onOptionFocus( index, event ); break;

      case 'blur': this.onOptionBlur( index, event ); break;

    }

  }

  render() {

    let { AriaRadio, CustomInputSoul } = this.props.Components;

    let { props, state } = this;

    let value = this.getValue();

    let filled = ! this.isEmptyValue( value );

    let options = this.getOptions();

    let invalid = this.getValueValidity();

    let focused = this.isFocused();

    let readonly = props.readOnly;

    let disabled = props.disabled;

    let required = props.required;


    let focusedIndex = state.focusedKey === undefined ? -1 : _.findIndex( options, { key: state.focusedKey } );

    let selectedIndex = ! filled ? -1 : _.findIndex( options, { selected: true } );

    let tabbableIndex = disabled ? -1 : ( focusedIndex > -1 ? focusedIndex : ( selectedIndex > -1 ? selectedIndex : 0 ) );


    return (

      <div

        ref={ this.ref( 'dom' ) }

        { ...this.omitProps() }

        className={ this.classed( '', { value: filled, invalid, focused, readonly, disabled, required } ) }

        role='radiogroup'

        aria-readonly={ readonly }

        aria-disabled={ disabled }

        aria-required={ required }

        aria-invalid={ Boolean( invalid ) || undefined }

        onFocus={ this.callbacks( 'onFocusGain, props.onFocus' ) }

        onBlur={ this.callbacks( 'onFocusLoss, props.onBlur' ) }

      >

        {

          _.map( options, ( option, index ) =>

            <AriaRadio

              key={ option.key }

              className={ this.classed( 'option', { selected: option.selected, focused: focusedIndex === index } ) }

              value={ option.selected }

              readOnly={ readonly }

              disabled={ disabled }

              jsonType={ props.jsonType }

              tabIndex={ tabbableIndex === index ? props.tabIndex : '-1' }

              data-index={ index }

              children={ option.label }

              onChange={ this.callback( 'onOptionChange', index, index ) }

              onKeyDown={ this.callbacks( 'onOptionEvent' ) }

              onFocus={ this.callbacks( 'onOptionEvent' ) }

              onBlur={ this.callbacks( 'onOptionEvent' ) }

            />

          )

        }

        <CustomInputSoul

          className={ this.classed( 'soul' ) }

          name={ props.name }

          value={ value }

          validity={ invalid }

          disabled={ disabled }

          jsonType={ props.jsonType }

          onFocus={ this }

          onInvalid={ props.onInvalid }

        />

      </div>

    );

  }

}
