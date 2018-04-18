const NAME_SUFFIXES = {

  '': ( option, index ) => '',

  '[]': ( option, index ) => `[]`,

  '[0]': ( option, index ) => `[${ index }]`,

  '[value]': ( option, index ) => `[${ option.value }]`,

};

const MODES = {

  array: {

    optionHasName: ( props, option ) => option.selected,

    optionNameSuffix: ( props ) => NAME_SUFFIXES[ props.nameSuffix ],

    optionMapping: ( props, option ) => option.value,

  },

  object: {

    optionHasName: ( props, option ) => props.mapping[ +option.selected ] !== undefined,

    optionNameSuffix: ( props ) => NAME_SUFFIXES[ '[value]' ],

    optionMapping: ( props, option ) => props.mapping,

  },

};


@Mixin.mix

export default class CheckboxGroup extends React.Component {

  static displayName = 'CheckboxGroup';

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

          input: '',

        },

        soul: '',

      },

      strings: [ 'error.required' ],

      Components: { Checkbox, Label, CustomInputSoul },

    } ),

    OptionsInputMixin( {

      optionsMode( props ) {

        return props.optionsMode;

      },

      validateValue( that, value ) {

        if ( that.props.required && that.isEmptyValue( value ) ) return that.stringed( 'error.required' );

      },

    } ),

  ];

  static propTypes = {

    optionsMode: PropTypes.oneOf( [ 'array', 'object' ] ),

    mapping: InputShared.PropTypes.boolMapping,

    name: PropTypes.string,

    optionNameSuffix: PropTypes.oneOf( [ '', '[]', '[0]' ] ),

    soulErrorName: PropTypes.string,

    soulEmptyProps: PropTypes.object,

    tabIndex: InputShared.PropTypes.tabIndex,

    jsonType: InputShared.PropTypes.jsonType,

    onInvalid: PropTypes.func,

  };

  static defaultProps = {

    optionsMode: 'array',

    mapping: 'true',

    optionNameSuffix: '[]',

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

    let { Checkbox, Label, CustomInputSoul } = this.props.Components;

    let { props, state } = this;

    let value = this.getValue();

    let filled = ! this.isEmptyValue( value );

    let options = this.getOptions();

    let error = this.getValueError();

    let focused = this.isFocused();

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

        className={ this.classed( '', { value: filled, error, focused, readonly, disabled, required } ) }

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

              <Checkbox

                ref={ this.ref( `inputs.${ index }` ) }

                className={ this.classed( 'option.input' ) }

                name={ mode.optionHasName( props, option ) ? optionName( option ) : undefined }

                value={ option.selected }

                error={ error }

                mapping={ mode.optionMapping( props, option ) }

                readOnly={ readonly }

                disabled={ disabled }

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

          error={ error }

          disabled={ disabled }

          onFocus={ this }

          onInvalid={ props.onInvalid }

        />

      </div>

    );

  }

}
