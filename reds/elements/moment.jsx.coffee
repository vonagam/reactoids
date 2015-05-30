$require 'mixins/component'
$require 'mixins/unison'
Moment = window.moment

$define ->


  Moment = React.createClass

    mixins: [ 'component', 'unison( "forceUpdate", 60000 )' ]

    propTypes:

      time: React.PropTypes.any.isRequired
      format: React.PropTypes.funced( React.PropTypes.string ).isRequired

    classes:
      'moment': ''

    render: ->

      time = Moment @props.time

      format = _.funced @props.format, time

      @toggleUnison format == 'fromNow'

      if format == 'fromNow' || format == 'calendar'

        time = time[ format ]()

      else

        time = time.format( format )

      `<span
        { ...this.omitProps() }
        className={ this.classed( '' ) }
      >
        { time }
      </span>`
