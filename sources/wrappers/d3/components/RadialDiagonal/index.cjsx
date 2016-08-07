# various

applyD3Props = requireSource 'wrappers/d3/various/applyD3Props'

# https://github.com/mbostock/d3/wiki/SVG-Shapes#diagonal


ATTRS = [

  'source'
  'target'
  'projection'

]


RadialDiagonal = React.createClass {

  mixins: Mixin.resolve [

    ComponentMixin {

      classes: {}

    }

  ]

  propTypes: {

    'datum': React.PropTypes.any

    'index': React.PropTypes.number

    'source': React.PropTypes.funced React.PropTypes.any

    'target': React.PropTypes.funced React.PropTypes.any

    'projection': React.PropTypes.func

  }

  render: ->=

    { props, classed } = this

    path = applyD3Props d3.svg.diagonal.radial(), _.pick props, ATTRS


    <path

      {... @omitProps() }

      className={ classed '.' }

      d={ path props.datum, props.index }

    />

  ##

}


module.exports = RadialDiagonal
