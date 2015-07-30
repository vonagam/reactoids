'use strict';

var Paginator, SearchParams;

require('../mixins/component');

SearchParams = require('../various/search_params');

Paginator = React.createClass({
  displayName: 'Paginator',
  mixins: ['component'],
  classes: {
    'paginator': {
      'separator': '',
      'page': {
        '-current': ''
      }
    }
  },
  propTypes: {
    current: React.PropTypes.number.isRequired,
    total: React.PropTypes.number.isRequired,
    size: React.PropTypes.number.isRequired,
    url: React.PropTypes.funced(React.PropTypes.string),
    param: React.PropTypes.string,
    search: React.PropTypes.object
  },
  getDefaultProps: function() {
    return {
      url: '',
      param: 'page',
      size: 7
    };
  },
  getPageUrl: function(page) {
    var obj;
    if (_.isFunction(this.props.url)) {
      return this.props.url(page);
    } else {
      return this.props.url + SearchParams.encode(_.merge({}, this.props.search, (
        obj = {},
        obj["" + this.props.param] = page,
        obj
      )));
    }
  },
  render: function() {
    var current, factor, items, near, side, size, total;
    current = this.props.current - 1;
    total = this.props.total;
    size = this.props.size;
    items = [];
    if (total <= size) {
      _.append(items, _.range(total));
    } else {
      factor = (size - 3) / 2;
      side = Math.ceil(factor / 2);
      near = Math.floor(factor / 2);
      if (current <= factor + 1) {
        _.append(items, _.range(0, factor + near + 2));
        items.push(void 0);
        _.append(items, _.range(total - side, total));
      } else if (current >= total - factor - 2) {
        _.append(items, _.range(0, side));
        items.push(void 0);
        _.append(items, _.range(total - (factor + near + 2), total));
      } else {
        _.append(items, _.range(0, side));
        items.push(void 0);
        _.append(items, _.range(current - near, current + near + 1));
        items.push(void 0);
        _.append(items, _.range(total - side, total));
      }
    }
    return React.createElement("div", React.__spread({}, this.omitProps(), {
      "className": this.classed('')
    }), _.map(items, function(item, index) {
      var page, page_is_current;
      if (item === void 0) {
        return React.createElement("div", {
          "key": 's' + index,
          "className": this.classed('separator')
        });
      } else {
        page = item + 1;
        page_is_current = page === this.props.current;
        return React.createElement("a", {
          "key": page,
          "className": this.classed('page', {
            '-current': page_is_current
          }),
          "href": (page_is_current ? null : this.getPageUrl(page))
        }, page);
      }
    }, this));
  }
});

module.exports = Paginator;
