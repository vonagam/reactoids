$ = requireDependency 'jquery'

Mixin = requireSource 'various/Mixin'

ComponentMixin = requireSource 'mixins/Component'

Layer = requireSource 'components/general/Layer'


$body = undefined

changeCounter = ( delta )->=

  $body ||= $ document.body

  counter = $body.data( 'reactoids-popup' ) || 0

  counter += delta

  $body.data 'reactoids-popup', counter

  counter


ComponentArgs = classes:

  'layer': ''


Popup = React.createClass

  mixins: Mixin.resolve [ ComponentMixin( ComponentArgs ) ]

  propTypes:

    layerProps: React.PropTypes.object

  componentDidMount: ->

    counter = changeCounter +1

    $body.addClass 'reactoids-popup' if counter == 1

  componentWillUnmount: ->

    counter = changeCounter -1

    $body.removeClass 'reactoids-popup' if counter == 0

  render: ->=

    { props, classed } = this

    <Layer
      {... props.layerProps }
      className={ classed 'layer' }
    >
      <div
        {... @omitProps() }
        className={ classed '.' }
      />
    </Layer>


module.exports = Popup
