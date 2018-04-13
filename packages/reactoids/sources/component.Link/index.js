const addNoopenerRel = _.memoize( ( rel ) => {

  if ( ! rel ) return 'noopener';

  if ( _.includes( _.split( rel, ' ' ), 'noopener' ) ) return rel;

  return `${ rel } noopener`;

} );


@Mixin.mix

export default class Link extends React.Component {

  static displayName = 'Link';

  static mixins = [

    ReactoidMixin( {

      classes: {

        '-current': '',

        '-disabled': '',

        '-loading': '',

      },

    } ),

    UrlWatcherMixin( {

      checks: {

        componentDidMount: ( that ) => that.shouldWatchUrl,

        componentDidUpdate: ( that ) => that.shouldWatchUrl,

      },

    } ),

  ];

  static propTypes = {

    href: PropTypes.string,

    target: PropTypes.funced( PropTypes.string ), // ( linkLocation: object, windowLocation: object ) => string

    rel: PropTypes.funced( PropTypes.string ), // ( linkLocation: object, windowLocation: object ) => string

    current: PropTypes.funced( PropTypes.bool ), // ( linkLocation: object, windowLocation: object ) => boolean

    disabled: PropTypes.bool,

    loading: PropTypes.bool,

  };

  static defaultProps = {

    target( linkLocation, windowLocation ) {

      return linkLocation.host === window.location.host ? '_self' : '_blank';

    },

    current( linkLocation, windowLocation ) {

      return linkLocation.href.replace( /\/?\??#?$/, '' ) === windowLocation.href.replace( /\/?\??#?$/, '' );

    },

  };

  render() {

    let { props } = this;


    let disabled = props.disabled;

    let loading = props.loading;


    let href = undefined;

    let target = undefined;

    let rel = undefined;

    let current = false;

    this.shouldWatchUrl = false;


    if ( _.isString( props.href ) && ! disabled && ! loading ) {

      let linkLocation = getLocation( props.href );

      href = props.href;

      target = _.funced( props.target, linkLocation, window.location );

      rel = addNoopenerRel( _.funced( props.rel, linkLocation, window.location ) );

      current = _.funced( props.current, linkLocation, window.location );

      this.shouldWatchUrl = linkLocation.host === window.location.host;

    }


    return (

      <a

        { ...this.omitProps() }

        className={ this.classed( '.', { current, disabled, loading } ) }

        href={ href }

        target={ target }

        rel={ rel }

        aria-current={ current ? ( props[ 'aria-current' ] || 'page' ) : undefined }

        aria-disabled={ disabled || loading || undefined }

      />

    );

  }

}
