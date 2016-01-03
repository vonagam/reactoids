ComponentMixin = requireSource 'mixins/Component'

applyD3Props = requireSource 'wrappers/d3/various/applyD3Props'


ComponentArgs = classes:

  {}


ATTRS = [

  'angle'
  'startAngle'
  'endAngle'
  'radius'
  'innerRadius'
  'outerRadius'
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


RadialArea = React.createClass

  mixins: Mixin.resolve [ ComponentMixin( ComponentArgs ) ]

  propTypes:

    data: React.PropTypes.array
    angle: React.PropTypes.funced React.PropTypes.number
    startAngle: React.PropTypes.funced React.PropTypes.number
    endAngle: React.PropTypes.funced React.PropTypes.number
    radius: React.PropTypes.funced React.PropTypes.number
    innerRadius: React.PropTypes.funced React.PropTypes.number
    outerRadius: React.PropTypes.funced React.PropTypes.number
    interpolate: React.PropTypes.funced React.PropTypes.oneOf INTERPOLATIONS
    tension: React.PropTypes.number
    defined: React.PropTypes.func

  render: ->=

    path = applyD3Props d3.svg.area.radial(), _.pick @props, ATTRS

    <path
      {... @omitProps() }
      className={ @classed '.' }
      d={ path @props.data }
    />


module.exports = RadialArea
