// https://w3c.github.io/aria/#listbox
// https://www.w3.org/TR/wai-aria-practices-1.1/#Listbox


const FOCUS_KEYS = {

  ArrowUp: ( index, options ) => ( options.length + index - 1 ) % options.length,

  ArrowLeft: ( index, options ) => ( options.length + index - 1 ) % options.length,

  ArrowDown: ( index, options ) => ( options.length + index + 1 ) % options.length,

  ArrowRight: ( index, options ) => ( options.length + index + 1 ) % options.length,

  Home: ( index, options ) => 0,

  End: ( index, options ) => options.length - 1,

};

const NAME_SUFFIXES = {

  '': ( option, index ) => '',

  '[]': ( option, index ) => `[]`,

  '[0]': ( option, index ) => `[${ index }]`,

  '[value]': ( option, index ) => `[${ option.value }]`,

};

const MODES = {

  single: {

    listboxProps: undefined,

    optionHasName: ( props, option ) => option.selected,

    optionNameSuffix: ( props ) => NAME_SUFFIXES[ '' ],

    optionMapping: ( props, option ) => option.value,

  },

  array: {

    listboxProps: {

      'aria-multiselectable': 'true'

    },

    optionHasName: ( props, option ) => option.selected,

    optionNameSuffix: ( props ) => NAME_SUFFIXES[ props.nameSuffix ],

    optionMapping: ( props, option ) => option.value,

  },

  object: {

    listboxProps: {

      'aria-multiselectable': 'true'

    },

    optionHasName: ( props, option ) => true,

    optionNameSuffix: ( prosp ) => NAME_SUFFIXES[ '[value]' ],

    optionMapping: ( props, option ) => props.mapping,

  },

};


const AriaListboxOption = Wrapper.create( AriaCheck, {

  props: { role: 'option' },

  identity: true,

} );


@Mixin.mix

export default class AriaListbox extends React.Component {

  static displayName = 'AriaListbox';

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

        option: '',

        soul: '',

      },

      strings: [ 'error.required' ],

      Components: { AriaListboxOption, CustomInputSoul },

    } ),

    OptionsInputMixin( {

      optionsMode( props ) {

        if ( props.multiple ) {

          return props.optionsMode;

        } else {

          return 'single';

        }

      },

      validateValue( that, value ) {

        if ( that.props.required && that.isEmptyValue( value ) ) return that.stringed( 'error.required' );

      },

      onDisable( that ) {

        if ( _.includes( this.refs.dom.childNodes, document.activeElement ) ) {

          document.activeElement.blur();

        }

      },

    } ),

  ];

  static propTypes = {

    multiple: PropTypes.bool,

    optionsMode: PropTypes.oneOf( [ 'array', 'object' ] ),

    mapping: InputShared.PropTypes.boolMapping,

    selectFocus: PropTypes.bool,

    name: PropTypes.string,

    optionNameSuffix: PropTypes.oneOf( [ '', '[]', '[0]' ] ),

    soulErrorName: PropTypes.string,

    soulEmptyProps: PropTypes.object,

    tabIndex: PropTypes.oneOfType( [ PropTypes.string, PropTypes.number ] ),

    jsonType: PropTypes.string,

    onInvalid: PropTypes.func,

  };

  static defaultProps = {

    multiple: true,

    optionsMode: 'array',

    mapping: 'true',

    selectFocus: false,

    optionNameSuffix: '[]',

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

    if ( FOCUS_KEYS[ event.key ] ) {

      event.preventDefault();

      let options = this.getOptions();

      let focusedIndex = FOCUS_KEYS[ event.key ]( index, options );

      Focus.focus( this.refs.dom.childNodes[ focusedIndex ] );

    }

  }

  onOptionFocus( index, event ) {

    let options = this.getOptions();

    let option = options[ index ];

    this.setState( { focusedKey: option.key } );

    if ( this.props.selectFocus && this.getOptionsMode() === 'single' ) this.toggleOption( option, true );

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

    let { AriaListboxOption, CustomInputSoul } = this.props.Components;

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


    let focusedIndex = state.focusedKey === undefined ? -1 : _.findIndex( options, { key: state.focusedKey } );

    let selectedIndex = ! filled ? -1 : _.findIndex( options, { selected: true } );

    let tabbableIndex = disabled ? -1 : ( focusedIndex > -1 ? focusedIndex : ( selectedIndex > -1 ? selectedIndex : 0 ) );


    let mode = MODES[ this.getOptionsMode() ];


    let optionName = _.noop;

    if ( props.name !== undefined ) {

      let valueIndex = 0;

      let optionNameSuffix = mode.optionNameSuffix( props );

      optionName = ( option ) => `${ props.name }${ optionNameSuffix( option, valueIndex++ ) }`;

    }


    return (

      <div

        ref={ this.ref( 'dom' ) }

        { ...this.omitProps() }

        { ...mode.listboxProps }

        className={ this.classed( '', { multiple, value: filled, error, focused, readonly, disabled, required } ) }

        role='listbox'

        aria-readonly={ readonly }

        aria-disabled={ disabled }

        aria-required={ required }

        aria-invalid={ Boolean( error ) || undefined }

        onFocus={ this.callbacks( 'onFocusGain, props.onFocus' ) }

        onBlur={ this.callbacks( 'onFocusLoss, props.onBlur' ) }

      >

        {

          _.map( options, ( option, index ) =>

            <AriaListboxOption

              key={ option.key }

              className={ this.classed( 'option', { selected: option.selected, focused: focusedIndex === index } ) }

              name={ mode.optionHasName( props, option ) ? optionName( option ) : undefined }

              value={ option.selected }

              mapping={ mode.optionMapping( props, option ) }

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

          { ...InputShared.getOptionsSoulProps( props, filled ) }

          className={ this.classed( 'soul' ) }

          error={ error }

          disabled={ disabled }

          onFocus={ this }

          onInvalid={ props.onInvalid }

        />

      </div>

    );

  }

}
