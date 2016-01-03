ComponentMixin = requireSource 'mixins/Component'

applyD3Props = requireSource 'wrappers/d3/various/applyD3Props'


ComponentArgs = classes:

  {}


ATTRS = [

  'angle'
  'radius'
  'interpolate'
  'tension'
  'defined'

]


INTERPOLATIONS = [ 

  'linear'
  'linear-closed'
  'step'
  'step-before'
  'step-after'
  'basis'
  'basis-open'
  'basis-closed'
  'cardinal'
  'cardinal-open'
  'cardinal-closed'
  'monotone'

]


Line = React.createClass

  mixins: Mixin.resolve [ ComponentMixin( ComponentArgs ) ]

  propTypes:

    data: React.PropTypes.array
    angle: React.PropTypes.funced React.PropTypes.number
    radius: React.PropTypes.funced React.PropTypes.number
    interpolate: React.PropTypes.funced INTERPOLATIONS
    tension: React.PropTypes.number
    defined: React.PropTypes.func

  render: ->=

    path = applyD3Props d3.svg.line(), _.pick @props, ATTRS

    <path
      {... @omitProps() }
      className={ @classed '.' }
      d={ path @props.data }
    />


module.exports = Line
