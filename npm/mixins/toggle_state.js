'use strict';

var mixin;

mixin = {
  toggleState: function(key, value) {
    var obj;
    this.setState((
      obj = {},
      obj["" + key] = arguments.length === 2 ? value : !this.state[key],
      obj
    ));
  }
};

ReactMixinManager.add('toggle_state', mixin);
