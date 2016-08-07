# various

applyD3Props = requireSource 'wrappers/d3/various/applyD3Props'

# https://github.com/mbostock/d3/wiki/SVG-Shapes#symbol


ATTRS = [

  'type'
  'size'

]


Symbol = React.createClass {

  mixins: Mixin.resolve [

    ComponentMixin {

      classes: {}

    }

  ]

  propTypes: {

    'datum': React.PropTypes.any

    'index': React.PropTypes.number

    'type': React.PropTypes.funced React.PropTypes.oneOf d3.svg.symbolTypes

    'size': React.PropTypes.funced React.PropTypes.number

  }

  render: ->=

    { props, classed } = this

    path = applyD3Props d3.svg.symbol(), _.pick props, ATTRS


    <path

      {... @omitProps() }

      className={ classed '.' }

      d={ path props.datum, props.index }

    />

  ##

}


module.exports = Symbol
