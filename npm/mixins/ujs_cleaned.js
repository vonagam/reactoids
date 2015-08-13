'use strict';

var findDOM, mixin;

findDOM = require('../various/find_dom');

mixin = {
  componentDidMount: function() {
    var attribute, i, len, ref;
    ref = ['class', 'props'];
    for (i = 0, len = ref.length; i < len; i++) {
      attribute = ref[i];
      findDOM(this).parentNode.removeAttribute('data-react-' + attribute);
    }
  }
};

ReactMixinManager.add('ujs_cleaned', mixin);
