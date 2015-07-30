'use strict';

var mixin;

mixin = {
  dom: function(ref) {
    if (!ref) {
      return React.findDOMNode(this);
    }
    if (typeof ref === 'string') {
      return React.findDOMNode(this.refs[ref]);
    }
    return React.findDOMNode(ref);
  }
};

ReactMixinManager.add('dom', mixin);
