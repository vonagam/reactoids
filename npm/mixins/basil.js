'use strict';

var mixin;

if (!window.Basil) {
  console.log('reactoids/mixins/basil: Basil is not defined in window, see http://wisembly.github.io/basil.js');
}

mixin = {
  basilSet: function() {
    var obj, obj1, value;
    if (arguments.length === 2) {
      value = _.merge({}, this.basilGet(), (
        obj = {},
        obj["" + arguments[0]] = arguments[1],
        obj
      ));
    } else {
      value = arguments[0];
    }
    this._basil.set(this.basil.key, value);
    this.setState((
      obj1 = {},
      obj1["" + this.basil.key] = value,
      obj1
    ));
  },
  basilGet: function() {
    return this._basil.get(this.basil.key);
  },
  componentWillMount: function() {
    var basil_value, obj;
    this._basil = new Basil(_.omit(this.basil, ['key', 'default']));
    basil_value = this.basilGet();
    if (basil_value) {
      this.setState((
        obj = {},
        obj["" + this.basil.key] = basil_value,
        obj
      ));
    } else if (this.basil["default"]) {
      this.basilSet(this.basil["default"]);
    }
  }
};

ReactMixinManager.add('basil', mixin);
