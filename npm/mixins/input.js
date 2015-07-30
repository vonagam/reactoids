'use strict';

var mixin;

mixin = {
  propTypes: {
    value: React.PropTypes.any,
    default_value: React.PropTypes.any,
    readonly: React.PropTypes.bool,
    input_delay: React.PropTypes.number,
    onChange: React.PropTypes.func,
    onTempChange: React.PropTypes.func
  },
  getDefaultProps: function() {
    return {
      readonly: false,
      input_delay: 100
    };
  },
  getInitialState: function() {
    return {
      input_temp: void 0,
      input_real: void 0
    };
  },
  getValue: function() {
    if (this.state.input_temp !== void 0) {
      return this.state.input_temp;
    }
    if (this.props.value !== void 0) {
      return this.props.value;
    }
    if (this.state.input_real !== void 0) {
      return this.state.input_real;
    }
    return this.props.default_value;
  },
  setValue: function(value) {
    var base;
    if (this.props.readonly) {
      return;
    }
    clearTimeout(this._input_timeout);
    this.setState({
      input_temp: void 0,
      input_real: value
    });
    if (typeof (base = this.props).onChange === "function") {
      base.onChange(value);
    }
  },
  setTempValue: function(value) {
    var base;
    if (this.props.readonly) {
      return;
    }
    if (this.props.input_delay === 0) {
      return this.setValue(value);
    }
    clearTimeout(this._input_timeout);
    this.setState({
      input_temp: value
    });
    if (typeof (base = this.props).onTempChange === "function") {
      base.onTempChange(value);
    }
    if (!(this.props.input_delay < 0)) {
      this._input_timeout = setTimeout(_.partial(this.setValue, value), this.props.input_delay);
    }
  },
  componentWillUnmount: function() {
    clearTimeout(this._input_timeout);
  },
  componentWillReceiveProps: function(next_props) {
    if (this.props.value !== next_props.value) {
      clearTimeout(this._input_timeout);
      this.setState({
        input_temp: void 0,
        input_real: next_props.value
      });
    }
  }
};

ReactMixinManager.add('input', mixin);
