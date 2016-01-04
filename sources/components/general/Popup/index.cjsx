# dependencies

$ = requireDependency 'jquery'

# components

Layer = requireSource 'components/general/Layer'


changeCounter = ->=

  $body = $ document.body

  changeCounter = ( delta )->=

    counter = $body.data( 'reactoids-popup' ) || 0

    counter += delta

    $body.data 'reactoids-popup', counter

    counter

  ##

  changeCounter delta

##


Popup = React.createClass

  mixins: Mixin.resolve [ 

    ComponentMixin

      classes:

        'layer': ''

      ##

    ##

  ]

  propTypes:

    'layerProps': React.PropTypes.object

  ##

  componentDidMount: ->

    counter = changeCounter +1

    $body.addClass 'reactoids-popup' if counter == 1

  ##

  componentWillUnmount: ->

    counter = changeCounter -1

    $body.removeClass 'reactoids-popup' if counter == 0

  ##

  render: ->=

    { props, classed } = this


    <Layer {... props.layerProps } className={ classed 'layer' }>

      {

        <div {... @omitProps() } className={ classed '.' } />

      }

    </Layer>

  ##

##


module.exports = Popup
