'use strict';

var Select;

require('../../mixins/component');

require('../../mixins/collection_input');

Select = React.createClass({
  displayName: 'Select',
  mixins: ['component', 'collection_input'],
  classes: {
    'select': {
      '-readonly': ''
    }
  },
  onChange: function(event) {
    this.setValue(event.target.value);
    event.target.blur();
  },
  render: function() {
    return React.createElement("select", React.__spread({}, this.omitProps(), {
      "className": this.classed('', {
        '-readonly': this.props.readonly
      }),
      "value": this.getValue(),
      "onChange": this.onChange
    }), (this.props.allow_blank ? React.createElement("option", {
      "value": ''
    }) : void 0), this.mapOptions(function(value, label) {
      return React.createElement("option", {
        "key": value,
        "value": value
      }, label);
    }));
  }
});

module.exports = Select;
