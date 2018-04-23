const ITEM_NAME_SUFFIXES = {

  '': ( index ) => '',

  '[]': ( index ) => `[]`,

  '[0]': ( index ) => `[${ index }]`,

  '.0': ( index ) => `.${ index }`,

};

const PROP_NAME_SUFFIXES = {

  'a[b]': ( key, name ) => name ? key.replace( /^([^\[]+)/, '[$1]' ) : key,

  '[a][b]': ( key, name ) => key.replace( /^([^\[]+)/, '[$1]' ),

  'a.b': ( key, name ) => name ? key.replace( /^(?=[^\.])/, '.' ) : key,

  '.a.b': ( key, name ) => key.replace( /^(?=[^\.])/, '.' ),

};


const eachValue = function( value, name, suffixes, iterator ) {

  if ( value === undefined ) {

    return;

  }

  if ( _.isArray( value ) ) {

    _.each( value, ( value, index ) => {

      eachValue( value, name + suffixes.item( index ), suffixes, iterator );

    } );

    return;

  }

  if ( _.isObject( value ) ) {

    _.each( value, ( value, key ) => {

      eachValue( value, name + suffixes.prop( key, name ), suffixes, iterator );

    } );

    return;

  }

  iterator( value, name );

}


@Mixin.mix

export default class HiddenInputGroup extends React.Component {

  static displayName = 'HiddenInputGroup';

  static mixins = [

    PureRenderMixin(),

    OmitPropsMixin(),

  ];

  static propTypes = {

    value: PropTypes.any,

    name: PropTypes.string,

    propNameSuffix: PropTypes.oneOf( _.keys( PROP_NAME_SUFFIXES ) ),

    itemNameSuffix: PropTypes.oneOf( _.keys( ITEM_NAME_SUFFIXES ) ),

    inputProps: PropTypes.funced( PropTypes.object ), // ( that: mixed, value: mixed, name: string ) => ?object

  };

  static defaultProps = {

    propNameSuffix: 'a[b]',

    itemNameSuffix: '[]',

  };

  render() {

    let { props } = this;

    let value = props.value;

    let name = props.name;


    if ( value === undefined ) return null;

    if ( name === undefined ) return null;


    let suffixes = {

      prop: PROP_NAME_SUFFIXES[ props.propNameSuffix ],

      item: ITEM_NAME_SUFFIXES[ props.itemNameSuffix ],

    };


    let inputs = [];

    let otherProps = this.omitProps();

    eachValue( value, name, suffixes, ( value, name ) => {

      let inputProps = _.funced( props.inputProps, this, value, name );

      inputs.push(

        <input

          key={ name }

          { ...otherProps }

          type='hidden'

          name={ name }

          value={ value }

          { ...inputProps }

        />

      );

    } );

    return inputs;

  }

}
