'use strict';

var mixin;

mixin = {
  connect: function(ref, signal, arguments_policy) {
    var that;
    that = this;
    return function() {
      var passed_arguments, receiver;
      passed_arguments = _.isBoolean(arguments_policy) ? arguments_policy === true ? arguments : void 0 : _.isArray(arguments_policy) ? arguments_policy : _.isNumber(arguments_policy) ? _.slice(arguments, 0, arguments_policy) : void 0;
      receiver = that[refs][ref];
      return receiver[signal].apply(receiver, passed_arguments);
    };
  }
};

ReactMixinManager.add('connect', mixin);
