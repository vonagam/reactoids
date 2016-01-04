# mixins

ComponentMixin = requireSource 'mixins/Component'

# utils

applyD3Props = requireSource 'wrappers/d3/various/applyD3Props'


ATTRS = [

  'x'
  'x0'
  'x1'
  'y'
  'y0'
  'y1'
  'interpolate'
  'tension'
  'defined'

]

INTERPOLATIONS = [

  'linear'
  'step'
  'step-before'
  'step-after'
  'basis'
  'basis-open'
  'cardinal'
  'cardinal-open'
  'monotone'

]


Area = React.createClass

  mixins: Mixin.resolve [

    ComponentMixin

      classes: {}

    ##

  ]

  propTypes:

    'data': React.PropTypes.array
    'x': React.PropTypes.funced React.PropTypes.number
    'x0': React.PropTypes.funced React.PropTypes.number
    'x1': React.PropTypes.funced React.PropTypes.number
    'y': React.PropTypes.funced React.PropTypes.number
    'y0': React.PropTypes.funced React.PropTypes.number
    'y1': React.PropTypes.funced React.PropTypes.number
    'interpolate': React.PropTypes.funced React.PropTypes.oneOf INTERPOLATIONS
    'tension': React.PropTypes.number
    'defined': React.PropTypes.func

  ##

  render: ->=

    { props, classed } = this

    path = applyD3Props d3.svg.area(), _.pick props, ATTRS


    <path

      {... @omitProps() }

      className={ classed '.' }

      d={ path props.data }

    />

  ##

##


module.exports = Area
