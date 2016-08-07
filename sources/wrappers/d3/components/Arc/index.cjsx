# various

applyD3Props = requireSource 'wrappers/d3/various/applyD3Props'

# https://github.com/mbostock/d3/wiki/SVG-Shapes#arc


ATTRS = [

  'innerRadius'
  'outerRadius'
  'cornerRadius'
  'padRadius'
  'startAngle'
  'endAngle'
  'padAngle'

]


Arc = React.createClass {

  mixins: Mixin.resolve [

    ComponentMixin {

      classes: {}

    }

  ]

  propTypes: {

    'datum': React.PropTypes.any

    'index': React.PropTypes.number

    'innerRadius': React.PropTypes.funced React.PropTypes.number

    'outerRadius': React.PropTypes.funced React.PropTypes.number

    'cornerRadius': React.PropTypes.funced React.PropTypes.number

    'padRadius': React.PropTypes.funced React.PropTypes.number

    'startAngle': React.PropTypes.funced React.PropTypes.number

    'endAngle': React.PropTypes.funced React.PropTypes.number

    'padAngle': React.PropTypes.funced React.PropTypes.number

  }

  render: ->=

    { props, classed } = this

    path = applyD3Props d3.svg.arc(), _.pick props, ATTRS


    <path

      {... @omitProps() }

      className={ classed '.' }

      d={ path props.datum, props.index }

    />

  ##

}


module.exports = Arc
