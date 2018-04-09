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

  '': ( that, option, index ) => '',

  '[]': ( that, option, index ) => `[]`,

  '[0]': ( that, option, index ) => `[${ index }]`,

  '[key]': ( that, option, index ) => `[${ option.key }]`,

};


@Mixin.mix

export default class AriaListboxMulti extends React.Component {

  static displayName = 'AriaListboxMulti';

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

          'soul': '',

        },

      },

      strings: [ 'error.required' ],

    } ),

    MultipleOptionsInputMixin( {

      validateValue( that, value ) {

        if ( that.props.required && value.length === 0 ) return that.stringed( 'error.required' );

      },

    } ),

  ];

  static propTypes = {

    nameSuffix: PropTypes.oneOfType( [ PropTypes.oneOf( _.keys( NAME_SUFFIXES ) ), PropTypes.func ] ), // ( that: mixed, option: {}, index: number ) => string

    name: PropTypes.string,

    required: PropTypes.bool,

    tabIndex: PropTypes.oneOfType( [ PropTypes.string, PropTypes.number ] ),

    jsonType: PropTypes.string,

    onInvalid: PropTypes.func,

  };

  static defaultProps = {

    nameSuffix: '[]',

    tabIndex: '0',

    jsonType: 'auto',

  };

  getInitialState() {

    return { focusedKeys: [] };

  }

  componentWillReceiveProps( nextProps ) {

    if ( nextProps.disabled && ! this.props.disabled ) {

      if ( _.includes( this.refs.dom.childNodes, document.activeElement ) ) {

        document.activeElement.blur();

      }

      if ( this.state.focusedKeys.length > 0 ) {

        this.setState( { focusedKeys: [] } );

      }

    }

  }

  onOptionClick( option, index, options, event ) {

    if ( this.props.disabled ) return;

    this.toggleOptions( [ option ] );

    event.currentTarget.focus();

  }

  onOptionKeyDown( option, index, options, event ) {

    if ( event.currentTarget !== event.target ) return;

    if ( event.altKey || event.ctrlKey || event.metaKey ) return;

    if ( event.key === ' ' ) {

      event.preventDefault();

      this.toggleOptions( [ option ] );

    }

    if ( FOCUS_KEYS[ event.key ] ) {

      event.preventDefault();

      let focusedIndex = FOCUS_KEYS[ event.key ]( index, options );

      this.refs.dom.childNodes[ focusedIndex ].focus();

    }

  }

  onOptionFocus( option, index, options, event ) {

    if ( event.currentTarget !== event.target ) return;

    this.setState( { focusedKeys: [ option.key ] } );

  }

  onOptionBlur( option, index, options, event ) {

    if ( event.currentTarget !== event.target ) return;

    this.setState( { focusedKeys: [] } );

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

  onFocus( event ) {

    if ( event.currentTarget !== event.target ) return;

    let tabbableOption = _.find( this.refs.dom.childNodes, ( node ) => node.hasAttribute( 'tabIndex' ) );

    if ( tabbableOption === this.refs.soul ) return;

    tabbableOption.focus();

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


    let focusedIndex = state.focusedKeys.length === 0 ? -1 : _.findIndex( options, { key: state.focusedKeys[ 0 ] } );

    let selectedIndex = value.length === 0 ? -1 : _.findIndex( options, { selected: true } );

    let tabbableIndex = disabled ? -1 : ( focusedIndex > -1 ? focusedIndex : ( selectedIndex > -1 ? selectedIndex : 0 ) );


    let valueIndex = 0;

    let nameSuffix = _.isFunction( props.nameSuffix ) ? props.nameSuffix : NAME_SUFFIXES[ props.nameSuffix ];

    let optionName = ( that, option, index ) => `${ props.name }${ nameSuffix( that, option, index ) }`;

    if ( props.name === undefined ) optionName = _.noop;


    return (

      <div

        ref={ this.ref( 'dom' ) }

        { ...this.omitProps() }

        className={ this.classed( '', { value: value.length > 0, error, focused, readonly, disabled, required } ) }

        role='listbox'

        aria-multiselectable='true'

        aria-readonly={ readonly }

        aria-disabled={ disabled }

        aria-invalid={ Boolean( error ) }

        aria-required={ required }

        onFocus={ this.callback( 'onFocusGain, onFocus, props.onFocus' ) }

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

                ( option.selected ) ?

                  <CustomInputSoul

                    className={ this.classed( 'option.soul' ) }

                    name={ optionName( this, option, valueIndex++ ) }

                    value={ option.value }

                    disabled={ disabled }

                    onFocus={ this.callback( 'onOptionSoulFocus' ) }

                    jsonType={ props.jsonType }

                  />

                : null

              }

            </div>

          )

        }

        {

          ( error ) ?

            <CustomInputSoul

              ref={ this.ref( 'soul' ) }

              className={ this.classed( 'soul' ) }

              name={ props.name }

              error={ error }

              disabled={ disabled }

              onFocus={ this }

              jsonType='skip'
              onInvalid={ props.onInvalid }

            />

          : null

        }

      </div>

    );

  }

}
