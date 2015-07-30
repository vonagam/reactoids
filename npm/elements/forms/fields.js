'use strict';

var Field, Fields;

require('../../mixins/component');

require('../../mixins/input');

Field = require('../../elements/forms/field');

Fields = React.createClass({
  displayName: 'Fields',
  mixins: ['component', 'input'],
  classes: {
    'fields': {
      '-readonly': '',
      'field': ''
    }
  },
  propTypes: {
    scheme: React.PropTypes.collection.isRequired,
    messages: React.PropTypes.object,
    onSubmit: React.PropTypes.func
  },
  getDefaultProps: function() {
    return {
      default_value: {},
      messages: {}
    };
  },
  onChange: function(path, value) {
    var current_value;
    current_value = _.clone(this.getValue());
    current_value[path] = value;
    this.setValue(current_value);
  },
  render: function() {
    var value;
    value = this.getValue();
    return React.createElement("div", React.__spread({}, this.omitProps(), {
      "className": this.classed('')
    }), _.map(this.props.scheme, function(field, key) {
      var messages;
      key = field.key || key;
      messages = _.mapValues(this.props.messages, key);
      _.merge(messages, field.messages);
      return React.createElement(Field, {
        "key": key,
        "className": this.mergeClassNames(this.classed('field', {
          '-readonly': this.props.readonly
        }), field.className),
        "type": field.type,
        "props": field.props,
        "value": value[key],
        "messages": messages,
        "readonly": this.props.readonly || field.readonly,
        "onChange": this._queue(this._partial(this.onChange, key), field.onChange),
        "onSubmit": this._queue(this.props.onSubmit, field.onSubmit)
      });
    }, this));
  }
});

module.exports = Fields;
