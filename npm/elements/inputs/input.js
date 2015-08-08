'use strict';

var Input;

require('../../mixins/component');

require('../../mixins/input');

Input = React.createClass({
  displayName: 'Input',
  mixins: ['component', 'input'],
  classes: {
    'input': {
      '-readonly': ''
    }
  },
  propTypes: {
    type: React.PropTypes.string,
    onBlur: React.PropTypes.func,
    onKeyDown: React.PropTypes.func,
    onSubmit: React.PropTypes.func
  },
  getDefaultProps: function() {
    return {
      type: 'text',
      default_value: ''
    };
  },
  onChange: function() {
    this.setTempValue(this.dom().value);
  },
  onBlur: function() {
    this.setValue(this.dom().value);
  },
  onKeyDown: function(event) {
    var base;
    if (event.key === 'Enter') {
      this.dom().blur();
      if (typeof (base = this.props).onSubmit === "function") {
        base.onSubmit();
      }
    }
  },
  onLabelClick: function() {
    this.dom().focus();
  },
  render: function() {
    return React.createElement("input", React.__spread({}, this.omitProps(), {
      "className": this.classed('', {
        '-readonly': this.props.readonly
      }),
      "value": this.getValue(),
      "type": this.props.type,
      "onChange": this.onChange,
      "onBlur": this._queue(this.props.onBlur, this.onBlur),
      "onKeyDown": this._queue(this.props.onKeyDown, this.onKeyDown)
    }));
  }
});

module.exports = Input;
