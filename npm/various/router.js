'use strict';

var Route, Router, SearchParams;

SearchParams = require('../various/search_params');

Route = (function() {
  function Route(path_scheme, options) {
    if (options == null) {
      options = {};
    }
    this.captures = [];
    this.constraints = options.constraints || {};
    this.defaults = options.defaults || {};
    this.path_checker = path_scheme.replace(/:/g, '§').replace(/\(([^)]*)\)/g, "(?:$1)?").replace(/\./g, '\\.').replace(/§(\w+)/g, (function(_this) {
      return function(match, name) {
        _this.captures.push(name);
        return _this.constraints[name] || '([\\w_-]+)';
      };
    })(this));
    this.path_checker = RegExp('^' + this.path_checker + '$');
    return;
  }

  Route.prototype.check = function(path) {
    var i, index, len, match, name, params, ref, value;
    match = path.match(this.path_checker);
    if (!match) {
      return;
    }
    params = {};
    ref = this.captures;
    for (index = i = 0, len = ref.length; i < len; index = ++i) {
      name = ref[index];
      if (value = match[index + 1]) {
        params[name] = value;
      }
    }
    return params;
  };

  return Route;

})();

Router = (function() {
  function Router(handlers) {
    if (handlers == null) {
      handlers = {};
    }
    this.routes = {};
    this.handlers = {};
    this.add(handlers);
    return;
  }

  Router.prototype.add = function(handlers) {
    var handler, name, options;
    for (name in handlers) {
      handler = handlers[name];
      if (_.isArray(handler)) {
        options = handler[1];
        handler = handler[0];
      } else {
        options = {};
      }
      this.routes[name] = new Route(Routes[name].toString(), options);
      this.handlers[name] = handler;
    }
  };

  Router.prototype.run = function(url, callback) {
    var name, params, path, ref, route, search;
    path = url.match(/^[^?]+/)[0];
    search = url.slice(path.length);
    ref = this.routes;
    for (name in ref) {
      route = ref[name];
      params = route.check(path);
      if (!params) {
        continue;
      }
      search = SearchParams.decode(search);
      return {
        handler: this.handlers[name],
        request: {
          path: path,
          route: name,
          search: search,
          params: _.merge(params, search)
        }
      };
    }
  };

  return Router;

})();

module.exports = Router;
