'use strict';

var Button, File, Filer;

if (!window.FileReader) {
  console.log('reactoids/elements/inputs/filer: FileReader is not defined in window, see window');
}

require('../../mixins/component');

require('../../mixins/input');

require('../../mixins/pure_render');

Button = require('../../elements/button');

File = React.createClass({
  displayName: 'File',
  mixins: ['pure_render'],
  propTypes: {
    file: React.PropTypes.any,
    preview: React.PropTypes.bool,
    classed: React.PropTypes.func,
    onRemove: React.PropTypes.func
  },
  onDataUrlLoad: function(reader) {
    if (!this.isMounted()) {
      return;
    }
    this.dom('preview').src = reader.result;
  },
  createDataUrl: function() {
    var reader;
    reader = new FileReader;
    reader.onload = this._partial(this.onDataUrlLoad, reader);
    reader.readAsDataURL(this.props.file);
  },
  componentDidMount: function() {
    if (this.props.preview) {
      this.createDataUrl();
    }
  },
  componentDidUpdate: function(prev_props) {
    if (prev_props.file !== this.props.file && this.props.preview) {
      this.createDataUrl();
    }
  },
  componentWillReceiveProps: function(next_props) {
    if (next_props.file !== this.props.file && this.props.preview) {
      this.dom('preview').src = '';
    }
  },
  render: function() {
    var classed, file;
    file = this.props.file;
    classed = this.props.classed;
    return React.createElement("div", {
      "className": classed('file')
    }, React.createElement("div", {
      "className": classed('name')
    }, file.name), (this.props.preview ? React.createElement("img", {
      "ref": 'preview',
      "className": classed('preview')
    }) : void 0), React.createElement(Button, {
      "className": classed('remove'),
      "onClick": this.props.onRemove,
      "text": 'x'
    }));
  }
});

Filer = React.createClass({
  displayName: 'Filer',
  mixins: ['component', 'input'],
  classes: {
    'filer': {
      '-readonly': '',
      '-multiple': '',
      '-empty': '',
      '-filled': '',
      '-dragging': '',
      'files': {
        'file': {
          'name': '',
          'preview': '',
          'remove': ''
        }
      },
      'dropzone': '',
      'actions': {
        'action': {
          '-select': '',
          '-clear': ''
        }
      }
    }
  },
  propTypes: {
    multiple: React.PropTypes.bool,
    preview: React.PropTypes.bool
  },
  getDefaultProps: function() {
    return {
      multiple: false,
      preview: true
    };
  },
  getInitialState: function() {
    return {
      dragging: false
    };
  },
  onChange: function(event) {
    var current_value, files, value;
    files = _.toArray(event.dataTransfer ? event.dataTransfer.files : event.target.files);
    if (_.isEmpty(files)) {
      return;
    }
    if (this.props.multiple) {
      current_value = this.getValue();
      value = current_value.concat(files);
    } else {
      value = files[0];
    }
    this.setValue(value);
  },
  onSelectClick: function() {
    this.dom('input').click();
  },
  onLabelClick: function() {
    this.onSelectClick;
  },
  onClearClick: function() {
    this.setValue(void 0);
  },
  componentWillReceiveProps: function(next_props) {
    if (this.props.value !== void 0 && next_props.value === void 0) {
      this.dom('input').value = '';
    }
  },
  onFileRemove: function(file) {
    var current_value, value;
    current_value = this.getValue();
    if (!current_value) {
      return;
    }
    if (this.props.multiple) {
      value = _.without(current_value, file);
      if (value.length === 0) {
        value = void 0;
      }
    } else {
      if (file === current_value) {
        value = void 0;
      }
    }
    this.setValue(value);
  },
  onDragLeave: function() {
    this.setState({
      dragging: false
    });
  },
  onDragOver: function(event) {
    this.setState({
      dragging: true
    });
    event.dataTransfer.dropEffect = 'copy';
    event.preventDefault();
  },
  onDrop: function(event) {
    this.setState({
      dragging: false
    });
    this.onChange(event);
    event.preventDefault();
  },
  render: function() {
    var button_text, value;
    value = this.getValue();
    button_text = value ? this.props.multiple ? 'Add Files' : 'Change File' : this.props.multiple ? 'Select Files' : 'Select File';
    return React.createElement("div", React.__spread({}, this.omitProps(), {
      "className": this.classed('', "-" + (value ? 'filled' : 'empty'), {
        '-readonly': this.props.readonly,
        '-multiple': this.props.multiple,
        '-dragging': this.props.dragging
      })
    }), React.createElement("div", {
      "className": this.classed('files')
    }, (value ? _.map(_.wrapInArray(value), function(file, index) {
      return React.createElement(File, {
        "key": index,
        "file": file,
        "preview": this.props.preview,
        "classed": this.classed,
        "onRemove": this._partial(this.onFileRemove, file)
      });
    }, this) : void 0)), React.createElement("div", {
      "className": this.classed('dropzone'),
      "onClick": this.onLabelClick,
      "onDragLeave": this.onDragLeave,
      "onDragOver": this.onDragOver,
      "onDrop": this.onDrop
    }), React.createElement("div", {
      "className": this.classed('actions')
    }, React.createElement(Button, {
      "className": this.classed('action', '-select'),
      "onClick": this.onSelectClick,
      "text": button_text
    }), React.createElement(Button, {
      "className": this.classed('action', '-clear'),
      "onClick": (value ? this.onClearClick : void 0),
      "text": 'Clear'
    })), React.createElement("input", {
      "ref": 'input',
      "style": {
        display: 'none'
      },
      "type": 'file',
      "multiple": this.props.multiple,
      "onChange": this.onChange
    }));
  }
});

module.exports = Filer;
