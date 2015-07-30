'use strict';

var mixin,
  slice = [].slice;

mixin = function() {
  var names, result;
  names = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  result = {};
  result.propTypes = {};
  _.each(names, function(name) {
    var props_name, render_name;
    props_name = name;
    render_name = "render" + (_.capitalize(_.camelCase(name)));
    result.propTypes[props_name] = React.PropTypes.funced(React.PropTypes.object);
    result.propTypes[render_name] = React.PropTypes.funced(React.PropTypes.node);
    result[name] = function(slot_props) {
      var user_props;
      user_props = _.funced(this.props[props_name], this) || {};
      return _.funced(this.props[render_name], this, slot_props, user_props);
    };
  });
  return result;
};

ReactMixinManager.add('slots', mixin);
