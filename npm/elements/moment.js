'use strict';

var Moment;

if (!window.moment) {
  console.log('reactoids/elements/moment: moment is not defined in window, see http://momentjs.com');
}

require('../mixins/component');

require('../mixins/unison');

Moment = React.createClass({
  displayName: 'Moment',
  mixins: ['component', 'unison( "forceUpdate", 60000 )'],
  classes: {
    'moment': ''
  },
  propTypes: {
    time: React.PropTypes.any.isRequired,
    format: React.PropTypes.funced(React.PropTypes.string).isRequired
  },
  render: function() {
    var format, format_is_relative, time;
    time = moment(this.props.time);
    format = _.funced(this.props.format, time);
    format_is_relative = format === 'fromNow' || format === 'calendar';
    this.toggleUnison(format_is_relative);
    return React.createElement("span", React.__spread({}, this.omitProps(), {
      "className": this.classed('')
    }), (format_is_relative ? time[format]() : time.format(format)));
  }
});

module.exports = Moment;
