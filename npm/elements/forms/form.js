'use strict';

var Button, Fields, Form, PropByPath;

if (!window.FormData) {
  console.log('reactoids/elements/forms/form: FormData is not defined in window, see window');
}

require('../../mixins/component');

require('../../mixins/input');

require('../../mixins/ajax_sender');

require('../../mixins/slots');

require('../../mixins/connect');

PropByPath = require('../../various/prop_by_path');

Fields = require('../../elements/forms/fields');

Button = require('../../elements/button');

Form = React.createClass({
  displayName: 'Form',
  mixins: ['component', 'input', 'ajax_sender', 'connect', 'slots( "actions" )'],
  classes: {
    'form': {
      '-readonly': '',
      '-waiting': '',
      'fields': '',
      'actions': {
        'action': ''
      }
    }
  },
  propTypes: {
    scheme: React.PropTypes.funced(React.PropTypes.collection).isRequired,
    messages: React.PropTypes.object
  },
  getDefaultProps: function() {
    return {
      default_value: {},
      messages: {},
      renderActions: function(form, slot_props, user_props) {
        return React.createElement(Button, React.__spread({}, user_props, {
          "className": form.mergeClassNames(slot_props.className, user_props.className),
          "onClick": form._queue(form.submit, user_props.onClick)
        }));
      }
    };
  },
  getInitialState: function() {
    return {
      errors: {}
    };
  },
  onAjaxBefore: function() {
    this.setState({
      errors: {}
    });
  },
  onAjaxError: function(jqXHR) {
    var json;
    json = jqXHR.responseJSON;
    if (!(json && json.errors)) {
      return;
    }
    this.setState({
      errors: json.errors
    });
  },
  onAjaxSuccess: function() {
    this.setValue(void 0);
  },
  toFormData: function(ajax) {
    var data, flattened;
    if (!FormData) {
      return;
    }
    data = new FormData;
    flattened = PropByPath.flattened(ajax.data, function(value) {
      return !(_.isArray(value) || _.isPlainObject(value));
    });
    _.each(flattened, function(value, key) {
      key = key.replace(/\.([^\.]+)/g, '[$1]');
      data.append(key, value);
    });
    ajax.data = data;
    ajax.processData = false;
    ajax.contentType = false;
  },
  getAjax: function() {
    var ajax, value;
    value = this.getValue();
    ajax = _.cloneDeep(_.funced(this.props.ajax, value));
    ajax || (ajax = {});
    ajax.data = _.merge({}, ajax.data, value);
    ajax.beforeSend = this._queue(this.onAjaxBefore, ajax.beforeSend);
    ajax.error = this._queue(this.onAjaxError, ajax.error);
    ajax.success = this._queue(this.onAjaxSuccess, ajax.success);
    if (!_.isEmpty(ajax.data)) {
      this.toFormData(ajax);
    }
    return ajax;
  },
  submit: function() {
    if (this.props.readonly) {
      return;
    }
    this.send();
  },
  render: function() {
    var messages, readonly;
    messages = _.clone(this.props.messages) || {};
    messages.errors = _.merge({}, messages.errors, this.state.errors);
    readonly = this.props.readonly || this.state.ajax_requests.sended;
    return React.createElement("div", React.__spread({}, this.omitProps(), {
      "className": this.classed('', {
        '-waiting': this.state.ajax_requests.sended,
        '-readonly': readonly
      })
    }), React.createElement(Fields, React.__spread({}, this.omitProps(), {
      "className": this.classed('fields'),
      "scheme": this.props.scheme,
      "messages": messages,
      "value": this.getValue(),
      "readonly": readonly,
      "onChange": this.setValue,
      "onSubmit": this.submit
    })), React.createElement("div", {
      "className": this.classed('actions')
    }, this.actions({
      className: this.classed('action')
    })));
  }
});

module.exports = Form;
