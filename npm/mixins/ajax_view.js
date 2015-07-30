'use strict';

var Mixer, __, getCurrentUrl, jsonDeepEqual, mixin;

if (!window.$) {
  console.log('reactoids/mixins/ajax_view: $ is not defined in window, see http://jquery.com');
}

Mixer = require('../various/mixer');

getCurrentUrl = function() {
  return window.location.pathname + window.location.search;
};

jsonDeepEqual = function(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
};

__ = {
  getInitialState: function(that) {
    return {
      data: {
        url: that.props.url,
        view: that.props.view,
        user: that.props.user,
        csrf: that.props.csrf
      }
    };
  },
  setView: function(that, data) {
    that.setState({
      data: data
    });
  },
  setViewHistory: function(that, position, data) {
    if (!window.history) {
      return;
    }
    window.history[position + 'State']({
      reacted: data.url
    }, document.title, data.url);
    if (position === 'push') {
      window.scrollTo(0, 0);
    }
  },
  saveViewCache: function(that, data) {
    that.viewsCache[data.url] = data;
  },
  loadViewCache: function(that, position, url) {
    var cache;
    cache = that.viewsCache[url];
    if (!(cache && jsonDeepEqual(cache.user, that.state.data.user))) {
      return false;
    }
    __.setViewHistory(that, position, cache);
    __.setView(that, cache);
    return true;
  },
  clearViewCache: function(that) {
    that.viewsCache = {};
  },
  rememberView: function(that, position, data) {
    __.saveViewCache(that, data);
    __.setViewHistory(that, position, data);
  },
  receiveView: function(that, position, data) {
    data.url = data.url.replace(/_=\d+&?/, '').replace(/[?&]+$/, '');
    __.rememberView(that, position, data);
    __.setView(that, data);
  },
  loadView: function(that, position, url, no_cache) {
    if (that.loading) {
      that.loading.abort();
    }
    if (!no_cache && __.loadViewCache(that, position, url)) {
      return;
    }
    that.loading = $.ajax({
      type: 'get',
      url: url,
      cache: false,
      dataType: 'json',
      complete: function() {
        return that.loading = null;
      },
      success: __.receiveView.bind(null, that, position)
    });
  },
  historyPoped: function(that, event) {
    var ref;
    if (!((ref = event.state) != null ? ref.reacted : void 0)) {
      return;
    }
    __.loadView(that, 'replace', event.state.reacted);
  },
  reloadView: function(that) {
    __.loadView(that, 'replace', that.state.data.url, true);
  },
  fetchView: function(that, url, no_cache) {
    if (url === getCurrentUrl()) {
      if (no_cache) {
        __.reloadView(that);
      }
      return;
    }
    __.loadView(that, 'push', url, no_cache);
  },
  csrfProtection: function(that) {
    $.ajaxPrefilter(function(options, originalOptions, xhr) {
      var token;
      if (options.crossDomain) {
        return;
      }
      token = that.state.data.csrf;
      if (token) {
        xhr.setRequestHeader('X-CSRF-Token', token);
      }
    });
  },
  componentDidMount: function(that) {
    __.csrfProtection(that);
    that.viewsCache = {};
    $(React.findDOMNode(that)).on('click', 'a[href]', function(event) {
      var $link, l, no_cache, target, url;
      $link = $(event.currentTarget);
      if ($link.data('no-ajax')) {
        return;
      }
      target = $link.attr('target');
      if (target && target !== '_self') {
        return;
      }
      l = window.location;
      url = $link.attr('href');
      url = url.replace(RegExp("^(?:https?:)?(?:\\/\\/)?" + l.host), '');
      if (url[0] === '?') {
        url = l.pathname + url;
      }
      if (url[0] === '#') {
        url = l.pathname + l.search + url;
      }
      if (!(url[0] === '/' && url[1] !== '/')) {
        return;
      }
      event.preventDefault();
      no_cache = $link.data('no-cache');
      __.fetchView(that, url, no_cache);
    });
    window.addEventListener('popstate', __.historyPoped.bind(null, that));
    __.rememberView(that, 'replace', that.state.data);
  }
};

mixin = Mixer.mixin(__, ['fetchView', 'reloadView', 'clearViewCache']);

ReactMixinManager.add('ajax_view', mixin);
