'use strict';

var propByPath;

propByPath = {
  flattened: (function() {
    var flatten;
    flatten = function(object, isValue, target, name) {
      if (isValue(object)) {
        target[name] = object;
      } else if (_.isObject(object)) {
        _.each(object, function(value, key) {
          var path;
          path = name ? name + '.' + key : key;
          flatten(value, isValue, target, path);
        });
      }
    };
    return function(object, isValue) {
      var result;
      if (isValue == null) {
        isValue = _.isPlainObject;
      }
      result = {};
      flatten(object, isValue, result);
      return result;
    };
  })(),
  inflated: function(object) {
    return _.transform(object, function(result, value, path) {
      _.set(result, path, value);
    }, {});
  }
};

module.exports = propByPath;
