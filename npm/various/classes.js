'use strict';

var classes, processClasses;

processClasses = function(args) {
  var result;
  result = [];
  _.each(args, function(arg) {
    var item;
    item = _.isString(arg) ? arg : _.isArray(arg) ? processClasses(arg) : _.isObject(arg) ? _.truthyKeys(arg).join(' ') : arg;
    if (item) {
      result.push(item);
    }
  });
  return result.join(' ');
};

classes = function() {
  return processClasses(_.toArray(arguments));
};

module.exports = classes;
