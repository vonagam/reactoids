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

    Tag: PropTypes.string,

    htmlFor: PropTypes.funced( PropTypes.any ), // ( that: mixed ) => mixed

    clickFor: PropTypes.func, // ( that: mixed, target: mixed ) => void

  };

  static defaultProps = {

    Tag: 'label',

    clickFor( that, target ) {

      if ( target.focus ) target.focus();

      if ( target.click ) target.click();

    },

  };

  onClick( event ) {

    let Tag = this.props.Tag;


    let target = this.props.htmlFor;

    if ( ! target ) return;


    if ( isIdString( target ) ) {

      if ( Tag === 'label' ) return;

      target = `#${ target }`;

    }


    let dom = this.dom();

    let focusable = Focus.closestFocusable( event.target );

    if ( focusable && focusable !== dom && dom.contains( focusable ) ) return;


    if ( Tag === 'label' ) event.preventDefault();


    if ( _.isFunction( target ) ) target = target( this );

    if ( _.isString( target ) ) target = $( target )[ 0 ];

    if ( ! target ) return;


    this.props.clickFor( this, target );

  }

  render() {

    let { props } = this;

    let Tag = props.Tag;

    let htmlFor = isIdString( props.htmlFor ) ? props.htmlFor : undefined;


    return (

      <Tag

        { ...this.omitProps() }

        className={ this.classed( '' ) }

        htmlFor={ Tag === 'label' ? htmlFor : undefined }

        onClick={ this.callback( 'onClick, props.onClick' ) }

      />

    );

  }

}
