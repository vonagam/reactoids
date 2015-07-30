'use strict';

var mixin, toggleAjaxRequest;

if (!window.$) {
  console.log('reactoids/mixins/ajax: $ is not defined in window, see http://jquery.com');
}

toggleAjaxRequest = function(that, name, request) {
  var ref;
  if (request) {
    that.ajax_requests[name] = request;
  } else {
    if ((ref = that.ajax_requests[name]) != null) {
      ref.abort();
    }
    delete that.ajax_requests[name];
  }
  that.setState({
    ajax_requests: _.mapValues(that.ajax_requests, function() {
      return true;
    })
  });
};

mixin = {
  getInitialState: function() {
    return {
      ajax_requests: {}
    };
  },
  componentWillMount: function() {
    this.ajax_requests = {};
  },
  sendAjax: function(name, options, force) {
    var params, request, that;
    if (this.ajax_requests[name]) {
      if (!force) {
        return;
      }
      this.abortAjax(name);
    }
    that = this;
    params = _.clone(options);
    params.complete = function() {
      that.abortAjax(name);
      _.pass(options.complete, arguments);
    };
    request = $.ajax(params);
    toggleAjaxRequest(that, name, request);
  },
  abortAjax: function(name) {
    toggleAjaxRequest(this, name, false);
  },
  componentWillUnmount: function() {
    var name;
    for (name in this.ajax_requests) {
      this.abortAjax(name);
    }
  }
};

ReactMixinManager.add('ajax', mixin);
