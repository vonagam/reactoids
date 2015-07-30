'use strict';

var Field;

require('../../mixins/component');

require('../../mixins/input');

require('../../mixins/connect');

require('../../mixins/content_for');

Field = React.createClass({
  displayName: 'Field',
  mixins: ['component', 'input', 'connect', 'content_for'],
  classes: {
    'field': {
      '-readonly': '',
      '-focused': '',
      '-filled': '',
      'wrapper': {
        'input': ''
      },
      'message': ''
    }
  },
  propTypes: {
    type: React.PropTypes.func.isRequired,
    props: React.PropTypes.object,
    messages: React.PropTypes.object,
    onFocus: React.PropTypes.func,
    onBlur: React.PropTypes.func,
    onSubmit: React.PropTypes.func
  },
  getDefaultProps: function() {
    return {
      props: {}
    };
  },
  getInitialState: function() {
    return {
      focus: false
    };
  },
  render: function() {
    var Input, input_props, value;
    Input = this.props.type;
    input_props = this.props.props;
    value = this.getValue();
    _.each(this.props.messages, function(data, name) {
      var content, position, props;
      data = _.funced(data, value);
      if (_.isPlainObject(data)) {
        content = data.content;
        props = data.props || {};
        position = data.position || 'after';
      } else {
        content = data;
        props = {};
        position = 'after';
      }
      if (!content) {
        return;
      }
      this.contentFor(position, React.createElement("div", React.__spread({
        "key": name
      }, props, {
        "className": this.mergeClassNames(this.classed('message', "message.-" + name), props.className),
        "onClick": (name === 'label' ? this.connect('input', 'onLabelClick', true) : void 0)
      }), content));
    }, this);
    return React.createElement("div", React.__spread({}, this.omitProps(), {
      "className": this.classed('', {
        '-focused': this.state.focus,
        '-filled': value !== void 0 && value !== ''
      })
    }), this.contentFor('before'), React.createElement("div", {
      "className": this.classed('wrapper')
    }, this.contentFor('inside_before'), React.createElement(Input, React.__spread({
      "ref": 'input'
    }, input_props, {
      "className": this.mergeClassNames(this.classed('input', {
        '-readonly': this.props.readonly
      }), input_props.className),
      "value": value,
      "readonly": this.props.readonly,
      "input_delay": -1.,
      "onChange": this.setValue,
      "onTempChange": this.setTempValue,
      "onFocus": this._queue(this._bindary(this.setState, this, {
        focused: true
      }), this.props.onFocus),
      "onBlur": this._queue(this._bindary(this.setState, this, {
        focused: false
      }), this.props.onBlur),
      "onSubmit": this.props.onSubmit
    })), this.contentFor('inside_after')), this.contentFor('after'));
  }
});

module.exports = Field;
