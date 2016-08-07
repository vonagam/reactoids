# mixins

D3DomMixin = requireSource 'wrappers/d3/mixins/D3Dom'

# various

applyD3Props = requireSource 'wrappers/d3/various/applyD3Props'

# https://github.com/mbostock/d3/wiki/SVG-Axes#axis


ATTRS = [

  'scale'
  'orient'
  #'ticks'
  'tickValues'
  #'tickSize'
  'innerTickSize'
  'outerTickSize'
  'tickPadding'
  'tickFormat'

]

DEFAULTS = _.transform ATTRS, ( defaults, attr )->

  defaults[ attr ] = d3.svg.brush()[ attr ]()

, {}


Axis = React.createClass {

  mixins: Mixin.resolve [

    ComponentMixin {

      classes: {}

    }

    D3DomMixin

  ]

  propTypes: {

    'scale': React.PropTypes.func

    'orient': React.PropTypes.oneOf [ 'top', 'bottom', 'left', 'right' ]

    #'ticks': React.PropTypes.any

    'tickValues': React.PropTypes.array

    #'tickSize': React.PropTypes.any

    'innerTickSize': React.PropTypes.number

    'outerTickSize': React.PropTypes.number

    'tickPadding': React.PropTypes.number

    'tickFormat': React.PropTypes.func

  }

  applyD3: ->

    applyD3Props @axis, _.pick( @props, ATTRS ), DEFAULTS


    @d3dom().call @axis

  ##

  componentDidMount: ->

    @axis = d3.svg.axis()


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


module.exports = Axis
