const NAME_SUFFIXES = {

  '': ( that, index ) => '',

  '[]': ( that, index ) => `[]`,

  '[0]': ( that, index ) => `[${ index }]`,

};


@Mixin.mix

class ArrayInputItem extends React.Component {

  static displayName = 'ArrayInputItem';

  static mixins = [

    CallbackMixin(),

    PureRenderMixin(),

    ComponentsMixin( {

      Components: { Button },

    } ),

  ];

  static propTypes = {

    array: PropTypes.any,

    index: PropTypes.number,

    name: PropTypes.string,

    value: PropTypes.any,

    removable: PropTypes.bool,

    tabIndex: PropTypes.oneOfType( [ PropTypes.string, PropTypes.number ] ),

  };

  onChange( value ) {

    this.props.array.onChange( this.props.index, value );

  }

  onRemove() {

    this.props.array.onRemove( this.props.index );

  }

  render() {

    let { Button } = this.props.Components;

    let { props } = this;

    let array = props.array;


    return (

      <div className={ array.classed( 'item' ) }>

        {

          array.renderInput( {

            className: array.classed( 'input' ),

            name: props.name,

            value: props.value,

            tabIndex: props.tabIndex,

            onChange: this.callback( 'onChange' ),

          } )

        }

        <Button

          className={ array.classed( 'remove' ) }

          onClick={ props.removable ? this.callback( 'onRemove' ) : undefined }

          children={ array.stringed( 'remove' ) }

        />

      </div>

    );

  }

}


@Mixin.mix

export default class ArrayInput extends React.Component {

  static displayName = 'ArrayInput';

  static mixins = [

    ReactoidMixin( {

      classes: {

        '-value': '',

        '-error': '',

        '-focused': '',

        '-readonly': '',

        '-disabled': '',

        '-required': '',

        items: {

          item: {

            input: '',

            remove: '',

          },

        },

        actions: {

          action: {

            '-add': '',

            '-clear': '',

          },

        },

        soul: '',

      },

      strings: [ 'remove', 'add', 'clear', 'error.required' ],

      slots: {

        input( that, slotProps, userProps ) {

          let { Input } = that.props.Components;


          return <Input { ...userProps } { ...slotProps } />;

        },

      },

      Components: { ArrayInputItem, Button, CustomInputSoul, Input }

    } ),

    InputMixin( {

      valueType: PropTypes.array,

      defaultValue: [],

      validateValue( that, value ) {

        if ( that.props.required && that.isDefaultValue( value ) ) return that.stringed( 'error.required' );

      },

    } ),

  ];

  static propTypes = {

    defaultItemValue: PropTypes.funced( PropTypes.any ), // ( that: mixed, values: Array< mixed > ) => mixed

    canAdd: PropTypes.funced( PropTypes.bool ), // ( that: mixed, values: Array< mixed > ) => bool

    canRemove: PropTypes.funced( PropTypes.bool ), // ( that: mixed, value: mixed, index: number, values: Array< mixed > ) => bool

    nameSuffix: PropTypes.oneOfType( [ PropTypes.oneOf( _.keys( NAME_SUFFIXES ) ), PropTypes.func ] ), // ( that: mixed, index: number ) => string

    name: PropTypes.string,

    tabIndex: PropTypes.oneOfType( [ PropTypes.string, PropTypes.number ] ),

    onInvalid: PropTypes.func,

  };

  static defaultProps = {

    canAdd: ( that, values ) => _.every( values ),

    canRemove: true,

    nameSuffix: '[]',

  };

  onChange( index, value ) {

    let values = _.clone( this.getValue() );

    values[ index ] = value;

    this.setValue( values );

  }

  onRemove( index ) {

    let values = _.clone( this.getValue() );

    values.splice( index, 1 );

    this.setValue( values );

  }

  onAdd() {

    let values = _.clone( this.getValue() );

    let value = _.cloneDeep( _.funced( this.props.defaultItemValue, this, values ) );

    values.push( value );

    this.setValue( values );

  }

  onClear() {

    let values = _.clone( this.getValue() );

    values = _.reject( values, ( value, index ) => _.funced( this.props.canRemove, this, value, index, values ) );

    return this.setValue( values );

  }

  render() {

    let { ArrayInputItem, Button, CustomInputSoul } = this.props.Components;

    let { props } = this;

    let values = this.getValue();

    let filled = ! this.isDefaultValue( values );

    let error = this.getValueError();

    let focused = this.isFocused();

    let readonly = props.readOnly;

    let disabled = props.disabled;

    let required = props.required;


    let name = props.name;

    let itemName = _.noop;

    if ( name !== undefined ) {

      let nameSuffix = _.isFunction( props.nameSuffix ) ? props.nameSuffix : NAME_SUFFIXES[ props.nameSuffix ];

      itemName = ( index ) => `${ name }${ nameSuffix( this, index ) }`;

    }


    return (

      <div

        { ...this.omitProps() }

        className={ this.classed( '', { value: filled, error, focused, readonly, disabled, required } ) }

        aria-readonly={ readonly }

        aria-disabled={ disabled }

        aria-required={ required }

        aria-invalid={ Boolean( error ) || undefined }

        onFocus={ this.callback( 'onFocusGain, props.onFocus' ) }

        onBlur={ this.callback( 'onFocusLoss, props.onBlur' ) }

      >

        <div className={ this.classed( 'items' ) }>

          {

            _.map( values, ( value, index ) =>

              <ArrayInputItem

                key={ index }

                array={ this }

                index={ index }

                name={ itemName( index ) }

                value={ value }

                removable={ _.funced( props.canRemove, this, value, index, values ) }

                tabIndex={ props.tabIndex }

              />

            )

          }

        </div>

        <div className={ this.classed( 'actions' ) }>

          <Button

            className={ this.classed( 'action', '-add' ) }

            tabIndex={ props.tabIndex }

            onClick={ _.funced( props.canAdd, this, values ) ? this.callback( 'onAdd' ) : undefined }

            children={ this.stringed( 'add' ) }

          />

          <Button

            className={ this.classed( 'action', '-clear' ) }

            tabIndex={ props.tabIndex }

            onClick={ _.some( values, ( value, index ) => _.funced( props.canRemove, this, value, index, values ) ) ? this.callback( 'onClear' ) : undefined }

            children={ this.stringed( 'clear' ) }

          />

        </div>

        <CustomInputSoul

          className={ this.classed( 'soul' ) }

          name={ name }

          error={ error }

          errorOnly={ true }

          disabled={ disabled }

          jsonType='skip'

          onFocus={ this }

          onInvalid={ props.onInvalid }

        />

      </div>

    );

  }

}
