'use strict';

var HOST_REMOVING_REGEXP, Link;

require('../mixins/component');

HOST_REMOVING_REGEXP = RegExp("^(?:https?:)?(?:\\/\\/)?" + window.location.host);

Link = React.createClass({
  displayName: 'Link',
  mixins: ['component'],
  classes: {
    'link': {
      '-current': '',
      '-disabled': ''
    }
  },
  propTypes: {
    href: React.PropTypes.string,
    current: React.PropTypes.bool
  },
  render: function() {
    var Tag, href, l, path;
    href = this.props.href;
    if (href) {
      l = window.location;
      if (href[0] === '?') {
        path = l.search;
      } else if (href[0] === '#') {
        path = l.hash;
      } else {
        href = href.replace(HOST_REMOVING_REGEXP, '');
        path = l.pathname;
        if (/\?/.test(href)) {
          path += l.search || '?';
        }
        if (/#/.test(href)) {
          path += l.hash || '#';
        }
      }
      if (href === path || this.props.current) {
        href = null;
      }
    }
    Tag = href ? 'a' : 'span';
    return React.createElement(Tag, React.__spread({}, this.omitProps(), {
      "className": this.classed('', {
        '-current': this.props.href && href === null,
        '-disabled': !this.props.href
      }),
      "href": href
    }));
  }
});

module.exports = Link;
