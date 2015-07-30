'use strict';

var Mixer;

Mixer = {
  inject: (function() {
    var publicMethod;
    publicMethod = function(method) {
      return function() {
        var arg, args, i, len;
        args = [this];
        for (i = 0, len = arguments.length; i < len; i++) {
          arg = arguments[i];
          args.push(arg);
        }
        return method.apply(null, args);
      };
    };
    return function(target, source, keys) {
      _.each(source, function(value, key) {
        if (!_.include(keys, key)) {
          return;
        }
        target[key] = _.isFunction(value) ? publicMethod(value) : value;
      });
      return target;
    };
  })(),
  mixin: (function() {
    var REACT_METHODS;
    REACT_METHODS = ['getInitialState', 'getDefaultProps', 'propTypes', 'componentWillMount', 'componentDidMount', 'componentWillReceiveProps', 'shouldComponentUpdate', 'componentWillUpdate', 'componentDidUpdate', 'componentWillUnmount'];
    return function(mixin, publics) {
      if (publics == null) {
        publics = [];
      }
      publics = publics.concat(REACT_METHODS);
      return Mixer.inject({}, mixin, publics);
    };
  })()
};

module.exports = Mixer;
