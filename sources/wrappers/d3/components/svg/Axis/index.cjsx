# mixins

ComponentMixin = requireSource 'mixins/Component'

D3DomMixin = requireSource 'wrappers/d3/mixins/D3Dom'

# utils

applyD3Props = requireSource 'wrappers/d3/various/applyD3Props'


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


Axis = React.createClass

  mixins: Mixin.resolve [

    ComponentMixin

      classes: {}

    ##

    D3DomMixin

  ]

  propTypes:

    'scale': React.PropTypes.func

    'orient': React.PropTypes.oneOf [ 'top', 'bottom', 'left', 'right' ]

    #'ticks': React.PropTypes.any

    'tickValues': React.PropTypes.array

    #'tickSize': React.PropTypes.any

    'innerTickSize': React.PropTypes.number

    'outerTickSize': React.PropTypes.number

    'tickPadding': React.PropTypes.number

    'tickFormat': React.PropTypes.func

  ##

  applyD3: ->

    axis = applyD3Props d3.svg.axis(), _.pick @props, ATTRS

    @d3dom().call axis

  ##

  componentDidMount: ->

    @applyD3()

  ##

  componentDidUpdate: ->

    @applyD3()

  ##

  render: ->=

    <g

      {... @omitProps() }

      className={ @classed '.' }

    />

  ##

##


module.exports = Axis
