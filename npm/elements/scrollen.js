'use strict';

var Button, Scrollen;

if (!window.$) {
  console.log('reactoids/elements/scrollen: $ is not defined in window, see http://jquery.com');
}

require('../mixins/component');

require('../mixins/listener');

Button = require('../elements/button');

Scrollen = React.createClass({
  displayName: 'Scrollen',
  mixins: ['component', 'listener'],
  classes: {
    'scrollen': ''
  },
  propTypes: {
    parent: React.PropTypes.any
  },
  getDefaultProps: function() {
    return {
      parent: window
    };
  },
  isBellowScreen: function() {
    var $button, $parent, button_top, offset;
    $button = $(this.dom('button'));
    $parent = $(this.props.parent);
    button_top = $button.offset().top;
    if (offset = $parent.offset()) {
      button_top -= offset.top;
    }
    return button_top > $parent.scrollTop() + $parent.height();
  },
  onScroll: function() {
    var bellow;
    bellow = this.isBellowScreen();
    if (bellow === false && this.bellow === true) {
      this.refs.button.onClick();
    }
    this.bellow = bellow;
  },
  componentDidMount: function() {
    this.bellow = this.isBellowScreen();
    this.addListener('scrollen', {
      target: window,
      event: 'scroll',
      callback: this.onScroll
    });
  },
  render: function() {
    return React.createElement(Button, React.__spread({
      "ref": 'button'
    }, this.omitProps(), {
      "className": this.classed('')
    }));
  }
});

module.exports = Scrollen;
