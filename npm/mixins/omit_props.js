'use strict';

var getKeys, mixin;

getKeys = function(cache, keys, name) {
  if (!cache[name]) {
    keys = _.flattenDeep([keys]);
    keys = _.flatten(_.map(keys, function(key) {
      if (_.isFunction(key) && key.propTypes) {
        return _.keys(key.propTypes);
      } else {
        return key;
      }
    }));
    cache[name] = keys;
  }
  return cache[name];
};

mixin = function() {
  var KEYS;
  KEYS = {};
  return {
    omitProps: function(keys, name, props) {
      if (keys == null) {
        keys = this.constructor;
      }
      if (name == null) {
        name = '';
      }
      if (props == null) {
        props = this.props;
      }
      name = '_o_' + name;
      keys = getKeys(KEYS, keys, name);
      return _.omit(props, keys);
    },
    pickProps: function(keys, name, props) {
      if (keys == null) {
        keys = this.constructor;
      }
      if (name == null) {
        name = '';
      }
      if (props == null) {
        props = this.props;
      }
      name = '_p_' + name;
      keys = getKeys(KEYS, keys, name);
      return _.pick(props, keys);
    }
  };
};

ReactMixinManager.add('omit_props', mixin);
