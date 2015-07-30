'use strict';

var Image;

require('../mixins/component');

Image = React.createClass({
  displayName: 'Image',
  mixins: ['component'],
  classes: {
    'image': ''
  },
  propTypes: {
    tag: React.PropTypes.string,
    url: React.PropTypes.string
  },
  getDefaultProps: function() {
    return {
      tag: 'img'
    };
  },
  render: function() {
    var Tag, style, url;
    Tag = this.props.tag;
    url = this.props.url;
    if (url) {
      style = Tag === 'img' ? {
        src: url
      } : {
        style: {
          backgroundImage: "url(" + url + ")"
        }
      };
    }
    return React.createElement(Tag, React.__spread({}, this.omitProps(), style, {
      "className": this.classed('')
    }));
  }
});

module.exports = Image;
