'use strict';

var getTimerFuns, interval, mixin, timeout,
  slice = [].slice;

getTimerFuns = function(constructor, destructor, keeper) {
  return {
    set: function() {
      var args, id, name;
      name = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
      id = this[keeper][name];
      if (id) {
        destructor(id);
      }
      id = constructor.apply(null, args);
      this[keeper][name] = id;
      return id;
    },
    clear: function(name) {
      var id;
      id = this[keeper][name];
      if (!id) {
        return;
      }
      destructor(id);
      delete this[keeper][name];
    }
  };
};

interval = getTimerFuns(setInterval, clearInterval, 'intervals');

timeout = getTimerFuns(setTimeout, clearTimeout, 'timeouts');

mixin = {
  componentWillMount: function() {
    this.intervals = {};
    this.timeouts = {};
  },
  setInterval: interval.set,
  clearInterval: interval.clear,
  setTimeout: timeout.set,
  clearTimeout: timeout.clear,
  componentWillUnmount: function() {
    _.each(this.intervals, clearInterval);
    _.each(this.timeouts, clearTimeout);
  }
};

ReactMixinManager.add('timer', mixin);
