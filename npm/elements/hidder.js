'use strict';

var Hidder;

require('../mixins/component');

Hidder = React.createClass({
  displayName: 'Hidder',
  mixins: ['component'],
  propTypes: {
    hide: React.PropTypes.bool
  },
  classes: {
    'hidder': {
      '-showing': '',
      '-hidding': ''
    }
  },
  getDefaultProps: function() {
    return {
      hide: true
    };
  },
  render: function() {
    return React.createElement("div", React.__spread({}, this.omitProps(), {
      "className": this.classed('', "-" + (this.props.hide ? 'hidding' : 'showing'))
    }), (!this.props.hide ? this.props.children : void 0));
  }
});

module.exports = Hidder;
