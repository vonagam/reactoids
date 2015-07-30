'use strict';

var Textarea;

require('../../mixins/component');

require('../../mixins/input');

Textarea = React.createClass({
  displayName: 'Textarea',
  mixins: ['component', 'input'],
  classes: {
    'textarea': {
      '-readonly': ''
    }
  },
  propTypes: {
    onBlur: React.PropTypes.func
  },
  getDefaultProps: function() {
    return {
      default_value: ''
    };
  },
  onChange: function(event) {
    this.setTempValue(event.target.value);
  },
  onBlur: function(event) {
    this.setValue(event.target.value);
  },
  onLabelClick: function() {
    this.dom().focus();
  },
  render: function() {
    return React.createElement("textarea", React.__spread({}, this.omitProps(), {
      "className": this.classed('', {
        '-readonly': this.props.readonly
      }),
      "value": this.getValue(),
      "onChange": this.onChange,
      "onBlur": this._queue(this.props.onBlur, this.onBlur)
    }));
  }
});

module.exports = Textarea;
