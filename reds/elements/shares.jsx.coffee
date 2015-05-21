getSocialShares = $require 'various/social_shares'
Icon = $require 'elements/icon'
classes = $require 'various/classes'
$require 'mixins/component'

$define ->


  ICONS =

    'vkontakte': 'vk'
    'facebook': 'facebook'
    'twitter': 'twitter'


  Shares = React.createClass

    propTypes:

      sites: React.PropTypes.array.isRequired
      url: React.PropTypes.string.isRequired
      show_counts: React.PropTypes.bool 

    mixins: [ 'component' ]

    getDefaultProps: ->

      show_counts: true

    getInitialState: ->

      counts: {}
      urls: {}

    onCountResolve: ( site, count )->

      @counts[ site ] = count

      @setState counts: @counts

      return

    componentWillMount: ->

      @counts = {}

      share_urls = getSocialShares @props.sites, @props.url, @props.show_counts && @onCountResolve

      @setState urls: share_urls

      return

    render: ->

      shares = _.map @props.sites, ( site )->

        href = @state.urls[ site ]
        count = @state.counts[ site ]

        `<a
          key={ site }
          className={ classes( 'share fa-fw', '-' + site, { '-counts': count > 0 } ) }
          href={ href }
        >
          <Icon className='icon' icon={ ICONS[ site ] } />
          <span className='count'>{ count }</span>
        </a>`

      , this

      `<div
        { ...this.omitProps() }
        className={ this.classes( 'Shares' ) }
      >
        { shares }
      </div>`
