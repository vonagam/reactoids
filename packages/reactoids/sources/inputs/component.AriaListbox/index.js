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

    optionHasSoul: ( props, option ) => option.selected,

    optionNameSuffix: ( props ) => NAME_SUFFIXES[ '' ],

    optionValue: ( props, option ) => option.value,

  },

  array: {

    listboxProps: {

      'aria-multiselectable': 'true'

    },

    optionHasSoul: ( props, option ) => option.selected,

    optionNameSuffix: ( props ) => NAME_SUFFIXES[ props.nameSuffix ],

    optionValue: ( props, option ) => option.value,

  },

  object: {

    listboxProps: {

      'aria-multiselectable': 'true'

    },

    optionHasSoul: ( props, option ) => props.mapping[ +option.selected ] !== undefined,

    optionNameSuffix: ( prosp ) => NAME_SUFFIXES[ '[value]' ],

    optionValue: ( props, option ) => props.mapping[ +option.selected ],

  },

};


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

        option: {

          '-selected': '',

          '-focused': '',

          soul: '',

        },

        soul: '',

      },

      strings: [ 'error.required' ],

      Components: { CustomInputSoul },

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

    mapping: PropTypes.array,

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

    mapping: [ undefined, 'true' ],

    selectFocus: false,

    optionNameSuffix: '[]',

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

    if ( this.props.selectFocus && this.getOptionsMode() === 'single' ) this.toggleOption( option, true );

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

  onOptionSoulFocus( event ) {

    event.currentTarget.parentNode.focus();

  }

  getSoulProps( filled ) {

    if ( ! filled && this.props.soulEmptyProps ) {

      return {

        name: _.defaultTo( this.props.soulEmptyProps.name, this.props.name ),

        value: this.props.soulEmptyProps.value || '',

        jsonType: this.props.soulEmptyProps.jsonType || 'auto',

      };

    } else {

      return {

        name: _.defaultTo( this.props.soulErrorName, this.props.name ),

        errorOnly: true,

        jsonType: 'skip',

      };

    }

  }

  render() {

    let { CustomInputSoul } = this.props.Components;

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


    let valueIndex = 0;

    let optionName = _.noop;

    if ( props.name !== undefined ) {

      let optionNameSuffix = mode.optionNameSuffix( props );

      optionName = ( option, index ) => `${ props.name }${ optionNameSuffix( option, index ) }`

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

        onFocus={ this.callback( 'onFocusGain, props.onFocus' ) }

        onBlur={ this.callback( 'onFocusLoss, props.onBlur' ) }

      >

        {

          _.map( options, ( option, index ) =>

            <div

              key={ option.key }

              className={ this.classed( 'option', { selected: option.selected, focused: focusedIndex === index } ) }

              role='option'

              aria-selected={ option.selected }

              aria-disabled={ disabled }

              data-index={ index }

              tabIndex={ tabbableIndex === index ? props.tabIndex : '-1' }

              onClick={ this.callback( 'onOptionEvent' ) }

              onKeyDown={ this.callback( 'onOptionEvent' ) }

              onFocus={ this.callback( 'onOptionEvent' ) }

              onBlur={ this.callback( 'onOptionEvent' ) }

            >

              { option.label }

              {

                ( mode.optionHasSoul( props, option ) ) ?

                  <CustomInputSoul

                    className={ this.classed( 'option.soul' ) }

                    name={ optionName( valueIndex++ ) }

                    value={ mode.optionValue( props, option ) }

                    disabled={ disabled }

                    jsonType={ props.jsonType }

                    onFocus={ this.callback( 'onOptionSoulFocus' ) }

                  />

                : null

              }

            </div>

          )

        }

        <CustomInputSoul

          { ...this.getSoulProps( filled ) }

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
