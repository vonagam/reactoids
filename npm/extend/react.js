'use strict';

React.PropTypes.funced = function() {
  var types;
  types = Array.prototype.slice.call(arguments);
  types = [React.PropTypes.func].concat(types);
  return React.PropTypes.oneOfType(types);
};

React.PropTypes.collection = React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.array]);
