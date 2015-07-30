'use strict';

var Button;

require('../mixins/component');

require('../mixins/ajax_sender');

Button = React.createClass({
  displayName: 'Button',
  mixins: ['component', 'ajax_sender'],
  classes: {
    'button': {
      '-enabled': '',
      '-disabled': '',
      '-waiting': ''
    }
  },
  propTypes: {
    onClick: React.PropTypes.func,
    text: React.PropTypes.node
  },
  onClick: function() {
    if (this.props.ajax) {
      this.send();
    }
  },
  render: function() {
    var Tag, enabled;
    Tag = this.props.href ? 'a' : 'span';
    enabled = this.props.href || this.props.onClick || this.props.ajax;
    return React.createElement(Tag, React.__spread({}, this.omitProps(), {
      "className": this.classed('', "-" + (enabled ? 'enabled' : 'disabled'), {
        '-waiting': this.state.ajax_requests.sended
      }),
      "onClick": this._queue(this.props.onClick, this.onClick)
    }), this.props.text || this.props.children);
  }
});

module.exports = Button;
