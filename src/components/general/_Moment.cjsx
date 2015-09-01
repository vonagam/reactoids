#§global 'moment', 'http://momentjs.com'

require '../../mixins/component'
require '../../mixins/unison'


Moment = React.createClass

  displayName: 'Moment'

  mixins: [ 'component', 'unison( "forceUpdate", 60000 )' ]

  classes:

    'moment': ''

  propTypes:

    time: React.PropTypes.any.isRequired
    format: React.PropTypes.funced( React.PropTypes.string ).isRequired

  render: ->

    time = moment @props.time

    format = _.funced @props.format, time

    format_is_relative = format == 'fromNow' || format == 'calendar'

    @toggleUnison format_is_relative      

    <span
      {... @omitProps() }
      className={ @classed '' }
    >
      {

        if format_is_relative

          time[ format ]()

        else

          time.format format

      }
    </span>


module.exports = Moment
