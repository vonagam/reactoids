@Mixin.mix

export default class RadioGroup extends React.Component {

  static displayName = 'RadioGroup';

  static mixins = [

    ReactoidMixin( {

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

        },

        soul: '',

      },

      strings: [ 'invalid.required' ],

      Components: { Radio, CustomInputSoul },

    } ),

    OptionsInputMixin( {

      optionsMode: 'single',

      validateValue( that, value ) {

        if ( that.props.required && that.isEmptyValue( value ) ) return that.stringed( 'invalid.required' );

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

    jsonType: 'auto',

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

    if ( event.defaultPrevented ) return;

    if ( event.altKey || event.ctrlKey || event.metaKey ) return;

    if ( InputShared.OPTIONS_FOCUS_KEYS[ event.key ] ) {

      event.preventDefault();

      let options = this.getOptions();

      let focusedIndex = InputShared.OPTIONS_FOCUS_KEYS[ event.key ]( index, options );

      this.refs[ `inputs.${ focusedIndex }` ].focus();

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

    let index = Number( event.currentTarget.getAttribute( 'data-index' ) );

    switch( event.type ) {

      case 'keydown': this.onOptionKeyDown( index, event ); break;

      case 'focus': this.onOptionFocus( index, event ); break;

      case 'blur': this.onOptionBlur( index, event ); break;

    }

  }

  render() {

    let { Radio, CustomInputSoul } = this.props.Components;

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

        onFocus={ this.callbacks( 'onFocusGain, props.onFocus' ) }

        onBlur={ this.callbacks( 'onFocusLoss, props.onBlur' ) }

      >

        {

          _.map( options, ( option, index ) =>

            <Label

              key={ option.key }

              className={ this.classed( 'option', { selected: option.selected, focused: focusedIndex === index } ) }

              htmlFor={ this.callback( 'getLabelFor', index, index ) }

              clickFor={ this.clickLabelFor }

              data-index={ index }

              onKeyDown={ this.callbacks( 'onOptionEvent' ) }

              onFocus={ this.callbacks( 'onOptionEvent' ) }

              onBlur={ this.callbacks( 'onOptionEvent' ) }

            >

              <Radio

                ref={ this.ref( `inputs.${ index }` ) }

                className={ this.classed( 'option.input' ) }

                name={ props.name }

                value={ option.selected }

                validity={ invalid }

                mapping={ option.value }

                readOnly={ readonly }

                disabled={ disabled }

                required={ required }

                tabIndex={ tabbableIndex === index ? props.tabIndex : '-1' }

                onChange={ this.callback( 'onInputChange', index, index ) }

              />

              { option.label }

            </Label>

          )

        }

        <CustomInputSoul

          { ...InputShared.getOptionsSoulProps( props, filled ) }

          className={ this.classed( 'soul' ) }

          validity={ invalid }

          disabled={ disabled }

          onFocus={ this }

          onInvalid={ props.onInvalid }

        />

      </div>

    );

  }

}
