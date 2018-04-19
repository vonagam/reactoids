const NAME_SUFFIXES = {

  '': ( index ) => '',

  '[]': ( index ) => `[]`,

  '[0]': ( index ) => `[${ index }]`,

};


@Mixin.mix

export default class ArrayInput extends React.Component {

  static displayName = 'ArrayInput';

  static mixins = [

    ReactoidMixin( {

      classes: {

        '-value': '',

        '-invalid': '',

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

      strings: [ 'remove', 'add', 'clear', 'invalid.required' ],

      slots: {

        input( that, slotProps, userProps ) {

          let { Input } = that.props.Components;


          return <Input { ...userProps } { ...slotProps } />;

        },

      },

      Components: { Input, Button, CustomInputSoul }

    } ),

    InputMixin( {

      valueType: PropTypes.array,

      emptyValue: [],

      validateValue( that, value ) {

        if ( that.props.required && that.isEmptyValue( value ) ) return that.stringed( 'invalid.required' );

      },

    } ),

  ];

  static propTypes = {

    defaultItemValue: PropTypes.funced( PropTypes.any ), // ( that: mixed, values: Array< mixed > ) => mixed

    canAdd: PropTypes.funced( PropTypes.bool ), // ( that: mixed, values: Array< mixed > ) => bool

    canRemove: PropTypes.funced( PropTypes.bool ), // ( that: mixed, value: mixed, index: number, values: Array< mixed > ) => bool

    name: PropTypes.string,

    itemNameSuffix: PropTypes.oneOf( [ '', '[]', '[0]' ] ),

    soulInvalidName: PropTypes.string,

    soulEmptyProps: PropTypes.object,

    tabIndex:InputShared.PropTypes.tabIndex,

  };

  static defaultProps = {

    canAdd: ( that, values ) => _.every( values ),

    canRemove: true,

    itemNameSuffix: '[]',

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

    let { Button, CustomInputSoul } = this.props.Components;

    let { props } = this;

    let values = this.getValue();

    let filled = ! this.isEmptyValue( values );

    let invalid = this.getValueValidity();

    let focused = this.isFocused();

    let readonly = props.readOnly;

    let disabled = props.disabled;

    let required = props.required;


    let itemName = _.noop;

    if ( props.name !== undefined ) {

      let itemNameSuffix = NAME_SUFFIXES[ props.itemNameSuffix ];

      itemName = ( index ) => `${ props.name }${ itemNameSuffix( index ) }`;

    }


    return (

      <div

        { ...this.omitProps() }

        className={ this.classed( '', { value: filled, invalid, focused, readonly, disabled, required } ) }

        aria-readonly={ readonly }

        aria-disabled={ disabled }

        aria-required={ required }

        aria-invalid={ Boolean( invalid ) || undefined }

        onFocus={ this.callbacks( 'onFocusGain, props.onFocus' ) }

        onBlur={ this.callbacks( 'onFocusLoss, props.onBlur' ) }

      >

        <div className={ this.classed( 'items' ) }>

          {

            _.map( values, ( value, index ) =>

              <div key={ index } className={ this.classed( 'item' ) }>

                {

                  this.renderInput( {

                    className: this.classed( 'input' ),

                    name: itemName( index ),

                    value: value,

                    tabIndex: props.tabIndex,

                    onChange: this.callback( 'onChange', index ),

                  } )

                }

                <Button

                  className={ this.classed( 'remove' ) }

                  onClick={ _.funced( props.canRemove, this, value, index, values ) ? this.callback( 'onRemove', index ) : undefined }

                  children={ this.stringed( 'remove' ) }

                />

              </div>

            )

          }

        </div>

        <div className={ this.classed( 'actions' ) }>

          <Button

            className={ this.classed( 'action', { add: true } ) }

            tabIndex={ props.tabIndex }

            onClick={ _.funced( props.canAdd, this, values ) ? this.callbacks( 'onAdd' ) : undefined }

            children={ this.stringed( 'add' ) }

          />

          <Button

            className={ this.classed( 'action', { clear: true } ) }

            tabIndex={ props.tabIndex }

            onClick={ _.some( values, ( value, index ) => _.funced( props.canRemove, this, value, index, values ) ) ? this.callbacks( 'onClear' ) : undefined }

            children={ this.stringed( 'clear' ) }

          />

        </div>

        <CustomInputSoul

          { ...InputShared.getOptionsSoulProps( props, filled ) }

          className={ this.classed( 'soul' ) }

          validity={ invalid }

          disabled={ disabled }

          onFocus={ this }

        />

      </div>

    );

  }

}
