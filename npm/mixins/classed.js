'use strict';

var CONFIG, mixin,
  slice = [].slice;

CONFIG = {
  classes: {},
  func: function(scheme) {
    return _.transform(scheme, function(result, path) {
      result[path] = path.replace(/^.+\.([^\.]+)$/, '$1');
    }, {});
  }
};

module.exports = CONFIG;

mixin = function() {
  var CLASSES, NAME, SCHEME, getSchemeKey, initMixin, makeScheme, mapToSchemeKeys, mergeClassNames, mergeClasseses, setClasses, toClasses;
  NAME = void 0;
  SCHEME = void 0;
  CLASSES = void 0;
  makeScheme = function(scheme_plan) {
    var flatten, result;
    result = [];
    flatten = function(nesting_key, value, key) {
      var current_key;
      current_key = nesting_key + key;
      result.push(current_key);
      if (!_.isPlainObject(value)) {
        return;
      }
      _.each(value, _.partial(flatten, current_key + '.'));
    };
    _.each(scheme_plan, _.partial(flatten, ''));
    return result;
  };
  getSchemeKey = (function() {
    var cache;
    cache = {};
    return function(key) {
      var check, result;
      if (key === '') {
        return NAME;
      }
      if (_.has(cache, key)) {
        return cache[key];
      }
      check = new RegExp('(?:^|\\.)' + key.replace('.', '\\.') + '$');
      result = _.find(SCHEME, function(scheme_key) {
        return check.test(scheme_key);
      });
      result || (result = key);
      cache[key] = result;
      return result;
    };
  })();
  mapToSchemeKeys = function(object) {
    return _.mapKeys(object, function(value, key) {
      return getSchemeKey(key);
    });
  };
  mergeClassNames = function(class_names) {
    class_names = _.compact(_.flattenDeep(class_names));
    if (class_names.length < 2) {
      return class_names[0];
    }
    if (!_.any(class_names, _.isPlainObject)) {
      return class_names.join(' ');
    }
    return class_names;
  };
  mergeClasseses = function(classes) {
    var args;
    args = [{}].concat(classes, function(a, b) {
      return mergeClassNames([a, b]);
    });
    return _.merge.apply(_, args);
  };
  toClasses = function(class_name) {
    var obj;
    if (!class_name) {
      return {};
    }
    if (_.isPlainObject(class_name)) {
      return mapToSchemeKeys(class_name);
    }
    if (_.isArray(class_name)) {
      return mergeClasseses(_.flattenDeep(_.map(class_name, toClasses)));
    }
    return (
      obj = {},
      obj["" + NAME] = class_name,
      obj
    );
  };
  initMixin = function(scheme_plan) {
    if (NAME) {
      return;
    }
    NAME = _.keys(scheme_plan)[0];
    SCHEME = makeScheme(scheme_plan);
    CLASSES = toClasses(CONFIG.classes[NAME] || CONFIG.func(SCHEME));
  };
  setClasses = function(that, class_name) {
    var classes;
    if (class_name) {
      classes = toClasses(class_name);
      classes = mergeClasseses([CLASSES, classes]);
    } else {
      classes = CLASSES;
    }
    that.__classed_classes = classes;
    that.__classed_cache = {};
  };
  return {
    propTypes: {
      className: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.array, React.PropTypes.object])
    },
    componentWillMount: function() {
      initMixin(this.classes);
      setClasses(this, this.props.className);
    },
    componentWillUpdate: function(next_props) {
      if (_.isEqual(this.props.className, next_props.className)) {
        return;
      }
      setClasses(this, next_props.className);
    },
    mergeClassNames: function() {
      var class_names;
      class_names = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      return mergeClassNames(class_names);
    },
    classed: function() {
      var cache, cache_key, class_name, class_names, classes, keys, scheme_keys;
      keys = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      keys = _.flatten(_.map(keys, function(key) {
        if (_.isPlainObject(key)) {
          return _.truthyKeys(key);
        }
        return key;
      }));
      cache = this.__classed_cache;
      cache_key = keys.join('&');
      if (_.has(cache, cache_key)) {
        return cache[cache_key];
      }
      classes = this.__classed_classes;
      scheme_keys = _.map(keys, function(key) {
        return getSchemeKey(key);
      });
      class_names = _.map(scheme_keys, function(scheme_key) {
        return classes[scheme_key];
      });
      class_name = mergeClassNames(class_names);
      cache[cache_key] = class_name;
      return class_name;
    }
  };
};

ReactMixinManager.add('classed', mixin);
