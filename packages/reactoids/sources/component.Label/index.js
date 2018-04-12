const isIdString = function( value ) {

  return _.isString( value ) && /^[\w-]+$/.test( value );

};


@Mixin.mix

export default class Label extends React.Component {

  static displayName = 'Label';

  static mixins = [

    ReactoidMixin(),

  ];

  static propTypes = {

    htmlFor: PropTypes.any,

  };

  onClick() {

    let target = this.props.htmlFor;

    if ( isIdString( target ) ) return;

    if ( _.isFunction( target ) ) target = target( this );

    if ( _.isString( target ) ) target = $( target )[ 0 ];

    if ( ! target ) return;

    if ( target.focus ) target.focus();

    if ( target.click ) target.click();

  }

  render() {

    let { props } = this;

    let htmlFor = isIdString( props.htmlFor ) ? props.htmlFor : undefined;


    return (

      <label

        { ...this.omitProps() }

        className={ this.classed( '' ) }

        htmlFor={ htmlFor }

        onClick={ this.callback( 'onClick, props.onClick' ) }

      />

    );

  }

}
