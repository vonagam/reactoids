Mixin = requireSource 'various/Mixin'
ComponentMixin = requireSource 'mixins/Component'
UrlWatcherMixin = requireSource 'mixins/UrlWatcher'

getUrlData = requireSource 'various/getUrlData'


clearHref = ( href )->=

  href.replace /\/?\??#?$/, ''

clearHost = ( host )->=

  host.replace /^www\./, ''


ComponentArgs = classes:

  '-current': ''
  '-enabled': ''
  '-disabled': ''

UrlWatcherArgs =

  shouldWatch: ( that )->= that.shouldWatchUrl


Link = React.createClass

  displayName: 'Link'

  mixins: Mixin.resolve [ ComponentMixin( ComponentArgs ) ]

  propTypes:

    href: React.PropTypes.string
    isCurrent: React.PropTypes.funced React.PropTypes.bool # ( url0, url1 )->=

  getDefaultProps: ->=

    isCurrent: ( url0, url1 )->=

      #TODO: check if simple api for ignoring hash and specified search params can be created

      clearHref( url0.href ) == clearHref( url1.href )

  render: ->=

    { props, classed } = this

    if _.isString props.href

      href = props.href

      urlData = getUrlData href

      @shouldWatchUrl = clearHost( urlData.host ) == clearHost( window.location.host )
    
      current = _.isString( href ) && _.funced props.isCurrent, urlData, window.location

    else

      @shouldWatchUrl = false

      current = false

    # key - https://github.com/facebook/react/issues/1448

    <a
      key={ if href then '1' else '0' }
      {... @omitProps() }
      className={ classed '.', "-#{ if _.isString href then 'enabled' else 'disabled' }", '-current': current }
      href={ href }
    />


module.exports = Link
