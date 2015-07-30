'use strict';

var Checkboxer;

require('../../mixins/component');

require('../../mixins/input');

Checkboxer = React.createClass({
  displayName: 'Checkboxer',
  mixins: ['component', 'input'],
  classes: {
    'checkboxer': {
      '-readonly': '',
      '-checked': ''
    }
  },
  propTypes: {
    onClick: React.PropTypes.func
  },
  onClick: function() {
    this.setValue(!Boolean(this.getValue()));
  },
  onLabelClick: function() {
    this.onClick();
  },
  render: function() {
    return React.createElement("div", React.__spread({}, this.omitProps(), {
      "className": this.classed('', {
        '-checked': this.getValue(),
        '-readonly': this.props.readonly
      }),
      "onClick": this._queue(this.props.onClick, this.onClick)
    }));
  }
});

module.exports = Checkboxer;
