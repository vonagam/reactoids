'use strict';

var mixin;

mixin = {
  componentDidMount: function() {
    var attribute, i, len, ref;
    ref = ['class', 'props'];
    for (i = 0, len = ref.length; i < len; i++) {
      attribute = ref[i];
      React.findDOMNode(this).parentNode.removeAttribute('data-react-' + attribute);
    }
  }
};

ReactMixinManager.add('ujs_cleaned', mixin);
