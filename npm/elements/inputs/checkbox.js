'use strict';

var Checkbox;

require('../../mixins/component');

require('../../mixins/input');

Checkbox = React.createClass({
  displayName: 'Checkbox',
  mixins: ['component', 'input'],
  classes: {
    'checkbox': {
      '-readonly': '',
      '-checked': ''
    }
  },
  onChange: function() {
    this.setValue(!Boolean(this.getValue()));
  },
  onLabelClick: function() {
    this.onChange();
  },
  render: function() {
    var value;
    value = this.getValue();
    return React.createElement("input", React.__spread({}, this.omitProps(), {
      "type": 'checkbox',
      "className": this.classed('', {
        '-checked': value,
        '-readonly': this.props.readonly
      }),
      "checked": Boolean(value),
      "onChange": this.onChange
    }));
  }
});

module.exports = Checkbox;
