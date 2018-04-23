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

  onKeyDown( event ) {

    if ( event.currentTarget !== event.target ) return;

    if ( event.altKey || event.ctrlKey || event.metaKey ) return;

    if ( event.key === ' ' || event.key === 'Enter' ) {

      event.preventDefault();

      event.currentTarget.click();

    }

  }

  render() {

    let { Link } = this.props.Components;

    let { props, state } = this;


    let hasClick = Boolean( props.onClick );

    let hasHref = _.isString( props.href );

    let hasAjax = ! _.isEmpty( _.funced( props.ajax ) );


    let Tag = props.Tag;

    let link = props.link || hasHref;

    let isSubmit = props.type === 'submit' && Tag === 'button' && ! link;

    let disabled = _.defaultTo( props.disabled, ! ( hasClick || hasHref || hasAjax || isSubmit ) );

    let loading = _.defaultTo( props.loading, state.ajaxes.click );


    if ( link ) {

      return (

        <Link

          { ...this.omitProps() }

          className={ this.classed( '', { link, disabled, loading } ) }

          href={ props.href }

          disabled={ disabled }

          loading={ loading }

          onClick={ this.callbacks( 'onClick, props.onClick' ) }

          onKeyDown={ this.callbacks( 'onKeyDown, props.onKeyDown' ) }

        />

      );

    }


    if ( Tag !== 'button' ) {

      return (

        <Tag

          { ...this.omitProps() }

          className={ this.classed( '', { link, disabled, loading } ) }

          role={ props.role || 'button' }

          aria-disabled={ disabled || loading || undefined }

          tabIndex={ disabled ? undefined : ( props.tabIndex || '0' ) }

          onClick={ this.callbacks( 'onClick, props.onClick' ) }

          onKeyDown={ this.callbacks( 'onKeyDown, props.onKeyDown' ) }

        />

      );

    }


    if ( Tag === 'button' ) {

      return (

        <button

          { ...this.omitProps() }

          className={ this.classed( '', { link, disabled, loading } ) }

          type={ props.type }

          disabled={ disabled || loading || undefined }

          onClick={ this.callbacks( 'onClick, props.onClick' ) }

          onKeyDown={ this.callbacks( 'onKeyDown, props.onKeyDown' ) }

        />

      );

    }

  }

}
