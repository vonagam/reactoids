$require 'mixins/component'
$require 'mixins/unison'
moment = window.moment

$define ->


  Moment = React.createClass

    propTypes:

      time: React.PropTypes.any.isRequired
      format: React.PropTypes.funced( React.PropTypes.string ).isRequired

    mixins: [ 'component', 'unison( "forceUpdate", 60000 )' ]

    render: ->

      time = moment @props.time

      format = _.funced @props.format, time

      @toggleUnison format == 'fromNow'

      if format == 'fromNow' || format == 'calendar'

        time = time[ format ]()

      else

        time = time.format( format )

      `<span
        { ...this.omitProps() }
        className={ this.classes( 'Moment' ) }
      >
        { time }
      </span>`
