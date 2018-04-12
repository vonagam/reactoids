@Mixin.mix

export default class Button extends React.Component {

  static displayName = 'Button';

  static mixins = [

    ReactoidMixin( {

      classes: {

        '-link': '',

        '-disabled': '',

        '-loading': '',

      },

      Components: { Link },

    } ),

    AjaxMixin(),

  ];

  static propTypes = {

    onClick: PropTypes.func,

    href: PropTypes.string,

    ajax: PropTypes.funced( PropTypes.object ), // () => object

    link: PropTypes.bool,

    disabled: PropTypes.bool,

    loading: PropTypes.bool,

    type: PropTypes.string,

  };

  static defaultProps = {

    type: 'button',

  };

  onClick() {

    if ( this.props.disabled ) return;

    let ajax = _.funced( this.props.ajax );

    this.sendAjax( 'click', ajax );

  }

  render() {

    let { Link } = this.props.Components;

    let { props, state } = this;


    let hasClick = Boolean( props.onClick );

    let hasHref = _.isString( props.href );

    let hasAjax = ! _.isEmpty( _.funced( props.ajax ) );


    let link = props.link || hasHref;

    let disabled = _.defaultTo( props.disabled, ! ( hasClick || hasHref || hasAjax ) );

    let loading = _.defaultTo( props.loading, state.ajaxes.click );


    return (

      ( link ) ?

        <Link

          { ...this.omitProps() }

          className={ this.classed( '', { link, disabled, loading } ) }

          href={ props.href }

          disabled={ disabled }

          loading={ loading }

          onClick={ this.callback( 'onClick, props.onClick' ) }

        />

      :

        <button

          { ...this.omitProps() }

          className={ this.classed( '', { link, disabled, loading } ) }

          type={ props.type }

          disabled={ disabled || loading || undefined }

          onClick={ this.callback( 'onClick, props.onClick' ) }

        />

    );

  }

}
