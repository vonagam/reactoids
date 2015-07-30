'use strict';

var Icon;

require('../mixins/component');

Icon = React.createClass({
  displayName: 'Icon',
  mixins: ['component'],
  classes: {
    'icon': ''
  },
  propTypes: {
    icon: React.PropTypes.string.isRequired
  },
  render: function() {
    return React.createElement("i", React.__spread({}, this.omitProps(), {
      "className": this.mergeClassNames(this.classed(''), "fa fa-" + this.props.icon)
    }));
  }
});

module.exports = Icon;
