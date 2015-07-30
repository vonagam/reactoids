'use strict';

var mixin, toggleListener;

toggleListener = function(listener, bool) {
  if (bool) {
    if (listener.turned) {
      return;
    }
    listener.target.addEventListener(listener.event, listener.callback);
    listener.turned = true;
  } else {
    if (!listener.turned) {
      return;
    }
    listener.turned = false;
    listener.target.removeEventListener(listener.event, listener.callback);
  }
};

mixin = {
  componentWillMount: function() {
    this.listeners = {};
  },
  addListener: function(key, listener) {
    if (arguments.length < 2) {
      listener = key;
      key = _.uniqueId('listener_');
    }
    listener.target || (listener.target = document);
    if (this.listeners[key]) {
      console.log("listener with " + key + " already exists");
      this.removeListener(key);
    }
    this.listeners[key] = listener;
    if (listener.turned !== false) {
      toggleListener(listener, true);
    }
  },
  removeListener: function(key) {
    var listener;
    listener = this.listeners[key];
    if (!listener) {
      return;
    }
    toggleListener(listener, false);
    delete this.listeners[key];
  },
  toggleListener: function(key, bool) {
    if (arguments.length === 1) {
      bool = !this.listeners[key].turned;
    }
    toggleListener(this.listeners[key], bool);
  },
  componentWillUnmount: function() {
    var key, listener, ref;
    ref = this.listeners;
    for (key in ref) {
      listener = ref[key];
      toggleListener(listener, false);
    }
  }
};

ReactMixinManager.add('listener', mixin);
