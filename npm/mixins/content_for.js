'use strict';

var mixin, resetContents;

resetContents = function(that) {
  that._for_contents = {};
  that._prop_contents = _.mapValues(that.props.contents, function(content) {
    return _.funced(content, that);
  });
};

mixin = {
  propTypes: {
    contents: React.PropTypes.object
  },
  getDefaultProps: function() {
    return {
      contents: {}
    };
  },
  componentWillMount: function() {
    resetContents(this);
  },
  componentWillUpdate: function() {
    resetContents(this);
  },
  contentFor: function(key, value) {
    var for_content, prop_content;
    for_content = this._for_contents[key];
    if (arguments.length === 1) {
      prop_content = this._prop_contents[key];
      if (!prop_content) {
        return for_content;
      }
      if (!for_content) {
        return prop_content;
      }
      return for_content.concat(prop_content);
    } else if (value) {
      this._for_contents[key] = for_content ? for_content.concat(value) : _.wrapInArray(value);
    }
  }
};

ReactMixinManager.add('content_for', mixin);
