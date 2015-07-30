'use strict';

var Table, toProps;

require('../mixins/component');

toProps = function(value) {
  if (!value) {
    return {};
  }
  if (value.children) {
    return value;
  }
  return {
    children: value
  };
};

Table = React.createClass({
  displayName: 'Table',
  mixins: ['component'],
  classes: {
    'table': {
      'head': {
        'row': '',
        'cell': ''
      },
      'body': {
        'row': '',
        'cell': ''
      },
      'foot': ''
    }
  },
  propTypes: {
    collection: React.PropTypes.array.isRequired,
    columns: React.PropTypes.collection.isRequired,
    tfoot: React.PropTypes.any,
    tr: React.PropTypes.funced(React.PropTypes.object)
  },
  render: function() {
    var ths, trs;
    ths = _.map(this.props.columns, function(column, key) {
      var th;
      th = toProps(_.funced(column.th, column));
      return React.createElement("th", React.__spread({
        "key": key
      }, th, {
        "className": this.mergeClassNames(this.classed('head.cell'), th.className)
      }));
    }, this);
    trs = _.map(this.props.collection, function(item, index) {
      var tr;
      tr = _.funced(this.props.tr, item) || {};
      return React.createElement("tr", React.__spread({
        "key": index
      }, tr, {
        "className": this.mergeClassNames(this.classed('body.row'), tr.className)
      }), _.map(this.props.columns, function(column, key) {
        var td;
        td = column.td;
        if (_.isString(td)) {
          td = {
            className: '-' + td,
            hildren: item[td]
          };
        } else {
          td = toProps(_.funced(td, item, column));
        }
        return React.createElement("td", React.__spread({
          "key": key
        }, td, {
          "className": this.mergeClassNames(this.classed('body.cell'), td.className)
        }));
      }, this));
    }, this);
    return React.createElement("table", React.__spread({}, this.omitProps(), {
      "className": this.classed('')
    }), React.createElement("thead", {
      "className": this.classed('head')
    }, React.createElement("tr", {
      "className": this.classed('head.row')
    }, ths)), React.createElement("tbody", {
      "className": this.classed('body')
    }, trs), (this.props.tfoot ? React.createElement("tfoot", {
      "className": this.classed('foot')
    }, this.props.tfoot) : void 0));
  }
});

module.exports = Table;
