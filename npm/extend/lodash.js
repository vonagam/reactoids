'use strict';

var slice = [].slice;

_.mixin({
  append: function(array, values) {
    Array.prototype.push.apply(array, values);
    return array;
  },
  prepend: function(array, values) {
    Array.prototype.unshift.apply(array, values);
    return array;
  },
  insert: function(array, index, values) {
    Array.prototype.splice.apply(array, [index, 0].concat(values));
    return array;
  },
  none: _.negate(_.any),
  bindary: function() {
    var func, partials, thisArg;
    func = arguments[0], thisArg = arguments[1], partials = 3 <= arguments.length ? slice.call(arguments, 2) : [];
    return function() {
      return func.apply(thisArg, partials);
    };
  },
  partialary: function() {
    var func, partials;
    func = arguments[0], partials = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    return function() {
      return func.apply(void 0, partials);
    };
  },
  queue: function() {
    var funcs;
    funcs = _.filter(arguments, _.isFunction);
    return function() {
      var func, i, len;
      for (i = 0, len = funcs.length; i < len; i++) {
        func = funcs[i];
        func.apply(void 0, arguments);
      }
    };
  },
  avg: function(collection, iteratee, thisArg) {
    return _.sum(collection, iteratee, thisArg) / _.size(collection);
  },
  clamp: function(value, min, max) {
    if (value > max) {
      return max;
    }
    if (value < min) {
      return min;
    }
    return value;
  },
  truthyKeys: function(object) {
    var result;
    result = [];
    _.forOwn(object, function(value, key) {
      if (value) {
        result.push(key);
      }
    });
    return result;
  },
  pass: function(func, args, thisArg) {
    if (func) {
      return func.apply(thisArg, args);
    }
  },
  funced: function(value) {
    var args;
    if (_.isFunction(value)) {
      if (arguments.length > 1) {
        args = _.slice(arguments, 1);
      }
      return value.apply(void 0, args);
    } else {
      return value;
    }
  },
  wrapInArray: function(value) {
    if (_.isArray(value)) {
      return value;
    } else {
      return [value];
    }
  },
  eacho: function(value, func) {
    if (_.isArray(value)) {
      _.each(value, func);
    } else {
      func(value);
    }
  }
});
