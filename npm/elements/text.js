'use strict';

var Text;

if (!window.Autolinker) {
  console.log('reactoids/elements/text: Autolinker is not defined in window, see https://github.com/gregjacobs/Autolinker.js');
}

require('../mixins/component');

Text = React.createClass({
  displayName: 'Text',
  mixins: ['component'],
  classes: {
    'text': {
      'paragraph': ''
    }
  },
  propTypes: {
    text: React.PropTypes.string
  },
  getInitialState: function() {
    return {
      text: this.processText(this.props.text)
    };
  },
  processText: function(text) {
    var className;
    if (!text) {
      return '';
    }
    className = this.classed('paragraph');
    text = Autolinker.link(text);
    text = '<p class="' + className + '">' + text + '</p>';
    text = text.replace(/\n{2,}/g, '</p><p class="' + className + '">');
    text = text.replace(/\n/g, '<br/>');
    return text;
  },
  componentWillReceiveProps: function(next_props) {
    if (next_props.text === this.props.text) {
      return;
    }
    this.setState({
      text: this.processText(next_props.text)
    });
  },
  render: function() {
    return React.createElement("div", React.__spread({}, this.omitProps(), {
      "className": this.classed(''),
      "dangerouslySetInnerHTML": {
        __html: this.state.text
      }
    }));
  }
});

module.exports = Text;
