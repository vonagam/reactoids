Mixin = requireSource 'various/Mixin'

ComponentMixin = requireSource 'mixins/Component'

applyD3Props = requireSource 'wrappers/d3/various/applyD3Props'


ComponentArgs = classes:

  {}


ATTRS = [

  'x'
  'y'
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
    x: React.PropTypes.funced React.PropTypes.number
    y: React.PropTypes.funced React.PropTypes.number
    interpolate: React.PropTypes.funced React.PropTypes.oneOf INTERPOLATIONS
    tension: React.PropTypes.number
    defined: React.PropTypes.func

  render: ->=

    path = applyD3Props d3.svg.line(), _.pick @props, ATTRS

    <path
      {... @omitProps() }
      className={ @classed '.' }
      d={ path @props.data }
      fill={ @props.fill || 'none' }
    />


module.exports = Line