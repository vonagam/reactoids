'use strict';

var Radigos;

require('../../mixins/component');

require('../../mixins/collection_input');

Radigos = React.createClass({
  displayName: 'Radigos',
  mixins: ['component', 'collection_input'],
  classes: {
    'radigos': {
      '-readonly': '',
      'radigo': {
        '-checked': ''
      }
    }
  },
  onClick: function(value) {
    var current_value;
    current_value = this.getValue();
    this.setValue(value === current_value ? void 0 : value);
  },
  render: function() {
    var current_value;
    current_value = this.getValue();
    return React.createElement("div", React.__spread({}, this.omitProps(), {
      "className": this.classed('', {
        '-readonly': this.props.readonly
      })
    }), this.mapOptions(function(value, label) {
      return React.createElement("div", {
        "key": value,
        "className": this.classed('radigo', {
          '-checked': value === current_value
        }),
        "onClick": this._partial(this.onClick, value)
      }, label);
    }));
  }
});

module.exports = Radigos;
