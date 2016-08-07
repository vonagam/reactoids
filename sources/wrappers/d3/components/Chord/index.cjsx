# various

applyD3Props = requireSource 'wrappers/d3/various/applyD3Props'

# https://github.com/mbostock/d3/wiki/SVG-Shapes#chord


ATTRS = [

  'source'
  'target'
  'radius'
  'startAngle'
  'endAngle'

]


Chord = React.createClass {

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

    'radius': React.PropTypes.funced React.PropTypes.number

    'startAngle': React.PropTypes.funced React.PropTypes.number

    'endAngle': React.PropTypes.funced React.PropTypes.number

  }

  render: ->=

    { props, classed } = this

    path = applyD3Props d3.svg.chord(), _.pick props, ATTRS


    <path

      {... @omitProps() }

      className={ classed '.' }

      d={ path props.datum, props.index }

    />

  ##

}


module.exports = Chord
