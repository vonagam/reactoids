# dependencies

window = requireDependency 'window' # location

# mixins

UrlWatcherMixin = requireSource 'mixins/UrlWatcher'

# various

getUrlData = requireSource 'various/getUrlData'


clearHref = ( href )->=

  href.replace /\/?\??#?$/, ''

##


Link = React.createClass {

  mixins: Mixin.resolve [

    ComponentMixin {

      classes: {

        '-current': ''
        '-another': ''
        '-enabled': ''
        '-disabled': ''

      }

    }

    UrlWatcherMixin {

      shouldWatch: _.property 'shouldWatchUrl'

    }

  ]

  propTypes: {

    'href': React.PropTypes.string

    'isCurrent': React.PropTypes.funced React.PropTypes.bool # ( url0, url1 )->=

  }

  getDefaultProps: ->=

    'isCurrent': ( url0, url1 )->=

      #TODO: check if simple api for ignoring hash and specified search params can be created

      clearHref( url0.href ) == clearHref( url1.href )

    ##

  ##

  render: ->=

    { props, classed } = this


    if _.isString props.href

      href = props.href

      urlData = getUrlData href

      @shouldWatchUrl = urlData.host == window.location.host

      current = _.isString( href ) && _.funced props.isCurrent, urlData, window.location

    else

      @shouldWatchUrl = false

      current = false

    ##


    <a

      {... @omitProps() }

      className={ classed(

        '.'

        "-#{ if _.isString href then 'enabled' else 'disabled' }"

        "-#{ if current then 'current' else 'another' }"

      ) }

      href={ href }

    />

  ##

}


module.exports = Link
