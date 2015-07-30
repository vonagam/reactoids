'use strict';

var mixin, simulateLink;

if (!window.Routes) {
  console.log('reactoids/mixins/ajax_sender: Routes is not defined in window, see http://railsware.github.io/js-routes');
}

require('../mixins/ajax');

simulateLink = require('../various/simulate_link');

mixin = {
  propTypes: {
    ajax: React.PropTypes.funced(React.PropTypes.object),
    redirect: React.PropTypes.funced(React.PropTypes.string, React.PropTypes.bool)
  },
  getDefaultProps: function() {
    return {
      redirect: function(data, status, xhr) {
        return xhr.getResponseHeader('Location');
      }
    };
  },
  onSendSuccess: function(data, status, xhr) {
    var location;
    location = _.funced(this.props.redirect, data, status, xhr);
    if (!location) {
      return;
    }
    simulateLink(location, React.findDOMNode(this), function($link) {
      return $link.data('no-cache', true);
    });
  },
  send: function() {
    var ajax;
    if (this.ajax_requests.sended) {
      return;
    }
    ajax = (typeof this.getAjax === "function" ? this.getAjax() : void 0) || _.funced(this.props.ajax);
    if (!ajax) {
      return;
    }
    ajax.method = (ajax.method || 'get').toUpperCase();
    if (/^\w+$/.test(ajax.url)) {
      ajax.url = Routes[ajax.url]();
    }
    ajax.success = _.queue(this.onSendSuccess, ajax.success);
    this.sendAjax('sended', ajax);
  }
};

ReactMixinManager.add('ajax_sender', mixin, 'ajax');
