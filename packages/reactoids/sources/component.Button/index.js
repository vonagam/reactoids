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

    Tag: PropTypes.string,

    href: PropTypes.string,

    ajax: PropTypes.funced( PropTypes.object ), // () => object

    link: PropTypes.bool,

    disabled: PropTypes.bool,

    loading: PropTypes.bool,

    type: PropTypes.string,

    onClick: PropTypes.func,

  };

  static defaultProps = {

    Tag: 'button',

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


    let Tag = props.Tag;

    let link = props.link || hasHref;

    let disabled = _.defaultTo( props.disabled, ! ( hasClick || hasHref || hasAjax ) );

    let loading = _.defaultTo( props.loading, state.ajaxes.click );


    if ( link ) {

      return (

        <Link

          { ...this.omitProps() }

          className={ this.classed( '', { link, disabled, loading } ) }

          href={ props.href }

          disabled={ disabled }

          loading={ loading }

          onClick={ this.callback( 'onClick, props.onClick' ) }

        />

      );

    }


    if ( Tag !== 'button' ) {

      return (

        <Tag

          { ...this.omitProps() }

          className={ this.classed( '', { link, disabled, loading } ) }

          aria-disabled={ disabled || loading || undefined }

          onClick={ this.callback( 'onClick, props.onClick' ) }

        />

      );

    }


    return (

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
