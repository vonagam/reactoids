'use strict';

var mixin;

mixin = function(method, duration, name) {
  var Unison, member_name, method_name, obj;
  if (name == null) {
    name = '';
  }
  Unison = {
    method: method,
    duration: duration,
    elements: [],
    interval: void 0,
    invoke: function() {
      _.invoke(Unison.elements, Unison.method);
    },
    toggle: function(element, bool) {
      var elements;
      elements = Unison.elements;
      if (bool === _.include(elements, element)) {
        return;
      }
      if (bool) {
        elements.push(element);
      } else {
        _.pull(elements, element);
      }
      if (elements.length > 0) {
        Unison.interval || (Unison.interval = setInterval(Unison.invoke, Unison.duration));
      } else {
        clearInterval(Unison.interval);
        Unison.interval = void 0;
      }
    }
  };
  member_name = '_' + _.snakeCase("In" + (_.capitalize(name)) + "Unison");
  method_name = "toggle" + (_.capitalize(name)) + "Unison";
  return (
    obj = {},
    obj["" + method_name] = function(bool) {
      if (Boolean(this[member_name]) === bool) {
        return;
      }
      this[member_name] = bool;
      Unison.toggle(this, bool);
    },
    obj.componentWillUnmount = function() {
      this[method_name](false);
    },
    obj
  );
};

ReactMixinManager.add('unison', mixin);
