'use strict';

var Arrayer, Button, Input, Item;

require('../../mixins/component');

require('../../mixins/input');

require('../../mixins/slots');

Input = require('../../elements/inputs/input');

Button = require('../../elements/button');

Item = React.createClass({
  displayName: 'Item',
  propTypes: {
    value: React.PropTypes.any,
    classed: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onRemove: React.PropTypes.func
  },
  render: function() {
    var classed;
    classed = this.props.classed;
    return React.createElement("div", {
      "className": classed('item')
    }, React.createElement(Input, {
      "className": classed('input'),
      "value": this.props.value,
      "onChange": this.props.onChange
    }), React.createElement(Button, {
      "className": classed('remove'),
      "onClick": this.props.onRemove,
      "text": 'x'
    }));
  }
});

Arrayer = React.createClass({
  displayName: 'Arrayer',
  mixins: ['component', 'input', 'slots( "item" )'],
  classes: {
    'arrayer': {
      '-readonly': '',
      '-filled': '',
      '-empty': '',
      'items': {
        'item': {
          'input': '',
          'remove': ''
        }
      },
      'actions': {
        'action': {
          '-add': '',
          '-clear': ''
        }
      }
    }
  },
  propTypes: {
    template: React.PropTypes.any,
    canAdd: React.PropTypes.funced(React.PropTypes.bool)
  },
  getDefaultProps: function() {
    return {
      template: '',
      canAdd: _.all,
      value: [],
      renderItem: function(arrayer, slot_props, user_props) {
        return React.createElement(Item, React.__spread({}, slot_props, user_props));
      }
    };
  },
  onItemChange: function(index, value) {
    var values;
    values = _.clone(this.getValue());
    values[index] = value;
    this.setValue(values);
  },
  onItemRemove: function(index) {
    var values;
    values = _.clone(this.getValue());
    values.splice(index, 1);
    this.setValue(values);
  },
  onAddClick: function() {
    var values;
    values = _.clone(this.getValue());
    values.push(_.cloneDeep(this.props.template));
    this.setValue(values);
  },
  onClearClick: function() {
    this.setValue([]);
  },
  render: function() {
    var is_filled, value;
    value = this.getValue();
    is_filled = value && value.length > 0;
    return React.createElement("div", React.__spread({}, this.omitProps(), {
      "className": this.classed('', "-" + (is_filled ? 'filled' : 'empty'), {
        '-readonly': this.props.readonly
      })
    }), React.createElement("div", {
      "className": this.classed('items')
    }, (is_filled ? _.map(value, function(item, index) {
      return this.item({
        key: index,
        value: item,
        classed: this.classed,
        onChange: this._partial(this.onItemChange, index),
        onRemove: this._partial(this.onItemRemove, index)
      });
    }, this) : void 0)), React.createElement("div", {
      "className": this.classe('actions')
    }, React.createElement(Button, {
      "className": this.classed('action', '-add'),
      "onClick": (_.funced(this.props.canAdd, value) ? this.onAddClick : void 0),
      "text": 'Add'
    }), React.createElement(Button, {
      "className": this.classed('action', '-clear'),
      "onClick": (is_filled ? this.onClearClick : void 0),
      "text": 'Clear'
    })));
  }
});

module.exports = Arrayer;
