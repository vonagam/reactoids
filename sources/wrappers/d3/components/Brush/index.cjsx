# mixins

D3DomMixin = requireSource 'wrappers/d3/mixins/D3Dom'

# various

applyD3Props = requireSource 'wrappers/d3/various/applyD3Props'

# https://github.com/mbostock/d3/wiki/SVG-Controls#brush

# TODO: check it


ATTRS = [

  'x'
  'y'
  'extent'
  'clamp'

]

DEFAULTS = _.transform ATTRS, ( defaults, attr )->

  defaults[ attr ] = d3.svg.brush()[ attr ]()

, {}


Brush = React.createClass {

  mixins: Mixin.resolve [

    ComponentMixin {

      classes: {}

    }

    D3DomMixin

  ]

  propTypes: {

    'x': React.PropTypes.func

    'y': React.PropTypes.func

    'extent': React.PropTypes.array

    'clamp': React.PropTypes.oneOfType [ React.PropTypes.bool, React.PropTypes.arrayOf( React.PropTypes.bool ) ]

    'onBrushStart': React.PropTypes.func # ( brush )->

    'onBrushMove': React.PropTypes.func # ( brush )->

    'onBrushEnd': React.PropTypes.func # ( brush )->

  }

  applyD3: ->

    applyD3Props @brush, _.pick( @props, ATTRS ), DEFAULTS


    @d3dom().call @brush

  ##

  componentDidMount: ->

    @brush = d3.svg.brush()


    @brush.on 'brushstart', _.partial @callback( 'props.onBrushStart' ), @brush

    @brush.on 'brush', _.partial @callback( 'props.onBrushMove' ), @brush

    @brush.on 'brushend', _.partial @callback( 'props.onBrushEnd' ), @brush


    @applyD3()

  ##

  componentDidUpdate: ->

    @applyD3()

  ##

  render: ->=

    { classed } = this


    <g

      {... @omitProps() }

      className={ classed '.' }

    />

  ##

}


module.exports = Brush
