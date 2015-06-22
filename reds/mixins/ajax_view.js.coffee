Mixer = $require 'various/mixer'


getCurrentUrl = -> window.location.pathname + window.location.search

jsonDeepEqual = ( a, b )-> JSON.stringify( a ) == JSON.stringify( b )


__ =

  getInitialState: ( that )->

    data:
      url: that.props.url
      view: that.props.view
      user: that.props.user
      csrf: that.props.csrf

  setView: ( that, data )->

    that.setState data: data

    return

  setViewHistory: ( that, position, data )->

    return unless window.history

    window.history[ position + 'State' ]( { reacted: data.url }, document.title, data.url )

    window.scrollTo 0, 0 if position == 'push'

    return

  saveViewCache: ( that, data )->

    that.viewsCache[ data.url ] = data

    return

  loadViewCache: ( that, position, url )->

    cache = that.viewsCache[ url ]

    return false unless cache && jsonDeepEqual( cache.user, that.state.data.user )

    __.setViewHistory that, position, cache

    __.setView that, cache
    
    return true

  clearViewCache: ( that )->

    that.viewsCache = {}

    return

  rememberView: ( that, position, data )->

    __.saveViewCache that, data

    __.setViewHistory that, position, data

    return

  receiveView: ( that, position, data )->

    data.url = data.url.replace( /_=\d+&?/, '' ).replace( /[?&]+$/, '' )

    __.rememberView that, position, data

    __.setView that, data

    return

  loadView: ( that, position, url, no_cache )->

    that.loading.abort() if that.loading

    return if ! no_cache && __.loadViewCache that, position, url

    that.loading = 
      $.ajax
        type: 'get'
        url: url
        cache: false
        dataType: 'json'
        complete: -> that.loading = null
        success: __.receiveView.bind null, that, position

    return

  historyPoped: ( that, event )->

    return unless event.state?.reacted

    __.loadView that, 'replace', event.state.reacted

    return

  reloadView: ( that )->

    __.loadView that, 'replace', that.state.data.url, true

    return

  fetchView: ( that, url, no_cache )->

    if url == getCurrentUrl()

      __.reloadView that if no_cache

      return

    __.loadView that, 'push', url, no_cache

    return

  csrfProtection: ( that )->

    $.ajaxPrefilter ( options, originalOptions, xhr )->

      return if options.crossDomain

      token = that.state.data.csrf

      xhr.setRequestHeader 'X-CSRF-Token', token if token

      return

    return

  componentDidMount: ( that )->

    __.csrfProtection that

    that.viewsCache = {}

    $( React.findDOMNode that ).on 'click', 'a[href]', ( event )->

      $link = $ event.currentTarget

      return if $link.data 'no-ajax'

      target = $link.attr 'target'

      return if target && target != '_self'
      
      l = window.location

      url = $link.attr 'href'

      url = url.replace RegExp( "^(?:https?:)?(?:\\/\\/)?" + l.host ), ''

      url = l.pathname + url if url[ 0 ] == '?'

      url = l.pathname + l.search + url if url[ 0 ] == '#'

      return unless url[ 0 ] == '/' && url[ 1 ] != '/'

      event.preventDefault()

      no_cache = $link.data 'no-cache'

      __.fetchView that, url, no_cache

      return

    window.addEventListener 'popstate', __.historyPoped.bind null, that

    __.rememberView that, 'replace', that.state.data

    return


mixin = Mixer.mixin __, [ 'fetchView', 'reloadView', 'clearViewCache' ]


ReactMixinManager.add 'ajax_view', mixin
