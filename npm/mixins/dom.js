'use strict';

var findDOM, mixin;

findDOM = require('../various/find_dom');

mixin = {
  dom: function(ref) {
    if (!ref) {
      return findDOM(this);
    }
    if (typeof ref === 'string') {
      return findDOM(this.refs[ref]);
    }
    return findDOM(ref);
  }
};

ReactMixinManager.add('dom', mixin);
