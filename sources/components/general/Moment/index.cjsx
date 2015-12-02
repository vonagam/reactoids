moment = requireDependency 'moment'

Mixin = requireSource 'various/Mixin'
ComponentMixin = requireSource 'mixins/Component'
UnisonMixin = requireSource 'mixins/Unison'


getTime = ( props )->=

  return undefined if props.time == undefined

  time = moment props.time, props.timeFormat

  return undefined if ! time.isValid()

  format = _.funced props.format, time

  suffix = props.suffix

  if props.reference != undefined && _.includes [ 'calendar', 'from', 'to' ], format

    reference = moment props.reference, props.referenceFormat

    return undefined if ! reference.isValid()

  switch format

    when 'calendar'

      string: time[ format ]( reference )

      unison: reference == undefined

    when 'fromNow', 'toNow'

      string: time[ format ]( ! suffix )

      unison: true

    when 'from', 'to'

      return undefined if ! reference

      string: time[ format ]( reference, ! suffix )

      unison: false

    else

      string: time.format format

      unison: false


ComponentArgs = classes:

  '-enabled': ''
  '-disabled': ''

UnisonArgs =

  update: _.method 'forceUpdate'
  duration: 10000
  shouldUnison: ( that )->= that.shouldUnison


Moment = React.createClass

  displayName: 'Moment'

  mixins: Mixin.resolve [ ComponentMixin( ComponentArgs ), UnisonMixin( UnisonArgs ) ]

  propTypes:

    time: React.PropTypes.any
    timeFormat: React.PropTypes.oneOfType [ React.PropTypes.string, React.PropTypes.arrayOf( React.PropTypes.string ) ]
    reference: React.PropTypes.any
    referenceFormat: React.PropTypes.oneOfType [ React.PropTypes.string, React.PropTypes.arrayOf( React.PropTypes.string ) ]
    format: React.PropTypes.funced( React.PropTypes.string ).isRequired # ( moment )->=
    suffix: React.PropTypes.bool

  getDefaultProps: ->=

    suffix: true

  render: ->=

    { props, classed } = this

    time = getTime props

    string = time && time.string

    @shouldUnison = Boolean time && time.unison

    <span
      {... @omitProps() }
      className={ classed '.', "-#{ if time then 'enabled' else 'disabled' }" }
    >
      {

        string

      }
    </span>


module.exports = Moment
