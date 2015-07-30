'use strict';

var __queue, customizer, lodash_methods, mixin;

customizer = function(a, b) {
  if (a === b) {
    return true;
  }
  if (_.isFunction(a) && _.isFunction(b)) {
    if (a._args && b._args && (a._method === b._method)) {
      return _.isEqual(a._args, b._args, customizer);
    }
    return false;
  }
};

mixin = {
  shouldComponentUpdate: function(next_props, next_state) {
    return !_.isEqual(this.props, next_props, customizer) || !_.isEqual(this.state, next_state, customizer);
  }
};

lodash_methods = ['bind', 'partial', 'ary', 'bindary', 'partialary', 'queue'];

_.each(lodash_methods, function(method) {
  mixin["_" + method] = function() {
    var result;
    result = _[method].apply(_, arguments);
    result._method = method;
    result._args = arguments;
    return result;
  };
});

__queue = mixin._queue;

mixin._queue = function() {
  var funcs;
  funcs = _.filter(arguments, _.isFunction);
  if (funcs.length < 2) {
    return funcs[0];
  }
  return __queue.apply(null, funcs);
};

ReactMixinManager.add('pure_render', mixin);
