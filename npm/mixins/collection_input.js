'use strict';

var getOption, mixin;

require('../mixins/input');

getOption = function(variant) {
  if (_.isFunction(variant)) {
    return variant();
  }
  if (!_.isObject(variant)) {
    return [variant, variant];
  }
  if (_.isArray(variant)) {
    return [variant[0], variant[1]];
  }
  return [variant.value, variant.label];
};

mixin = {
  propTypes: {
    collection: React.PropTypes.collection.isRequired,
    allow_blank: React.PropTypes.bool
  },
  getDefaultProps: function() {
    return {
      allow_blank: true
    };
  },
  mapOptions: function(iteratee) {
    var mapper, options;
    mapper = _.isArray(this.props.collection) ? getOption : function(label, value) {
      return [value, label];
    };
    options = _.map(this.props.collection, mapper);
    return _.map(options, (function(option) {
      return iteratee.apply(this, option);
    }), this);
  }
};

ReactMixinManager.add('collection_input', mixin, 'input');
