// https://w3c.github.io/aria/#radiogroup
// https://www.w3.org/TR/wai-aria-practices-1.1/#radiobutton


@Mixin.mix

export default class AriaRadioGroup extends React.Component {

  static displayName = 'AriaRadioGroup';

  static mixins = [

    ReactoidMixin( {

      id: true,

      classes: {

        '-value': '',

        '-invalid': '',

        '-focused': '',

        '-readonly': '',

        '-disabled': '',

        '-required': '',

        option: {

          '-selected': '',

          '-focused': '',

          input: '',

          label: '',

        },

        soul: '',

      },

      strings: [ 'invalid.required' ],

      Components: { AriaRadio, Label, CustomInputSoul },

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

    jsonType: InputShared.PropTypes.jsonType,

    tabIndex: InputShared.PropTypes.tabIndex,

    onInvalid: PropTypes.func,

  };

  static defaultProps = {

    selectFocus: true,

    jsonType: 'auto',

    tabIndex: '0',

  };

  getInitialState() {

    return { focusedKey: undefined };

  }

  getLabelFor( index ) {

    return this.refs[ `inputs.${ index }` ];

  }

  clickLabelFor( lable, input ) {

    input.onLabelClick();

  }

  onInputChange( index, value ) {

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

      this.refs[ `inputs.${ focusedIndex }` ].focus();

      if ( this.props.selectFocus ) this.toggleOption( options[ focusedIndex ], true );

    }

  }

  onOptionFocus( index, event ) {

    let options = this.getOptions();

    let option = options[ index ];

    this.setState( { focusedKey: option.key } );

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

    let { AriaRadio, Label, CustomInputSoul } = this.props.Components;

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

            <div

              key={ option.key }

              className={ this.classed( 'option', { selected: option.selected, focused: focusedIndex === index } ) }

              data-index={ index }

              onKeyDown={ this.callbacks( 'onOptionEvent' ) }

              onFocus={ this.callbacks( 'onOptionEvent' ) }

              onBlur={ this.callbacks( 'onOptionEvent' ) }

            >

              <AriaRadio

                ref={ this.ref( `inputs.${ index }` ) }

                className={ this.classed( 'option.input' ) }

                value={ option.selected }

                readOnly={ readonly }

                disabled={ disabled }

                jsonType={ props.jsonType }

                aria-labelledby={ this.id( `label-${ index }` ) }

                tabIndex={ tabbableIndex === index ? props.tabIndex : '-1' }

                onChange={ this.callback( 'onInputChange', index ) }

              />

              <Label

                id={ this.id( `label-${ index }` ) }

                className={ this.classed( 'option.label' ) }

                htmlFor={ this.callback( 'getLabelFor', index ) }

                clickFor={ this.clickLabelFor }

                children={ option.label }

              />

            </div>

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
