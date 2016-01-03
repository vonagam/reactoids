ComponentMixin = requireSource 'mixins/Component'
LayeredMixin = requireSource 'mixins/Layered'


ComponentArgs = classes:

  {}


Layer = React.createClass

  mixins: Mixin.resolve [ ComponentMixin( ComponentArgs ), LayeredMixin ]

  propTypes:

    layer: React.PropTypes.shape
      root: React.PropTypes.funced React.PropTypes.any # ->= # CAUTION isEqual doesn't know how to compare functions
      order: React.PropTypes.number
      decorateContainer: React.PropTypes.func # ( container )-> # CAUTION isEqual doesn't know how to compare functions

  componentWillMount: ->

    @addLayer 'layer', @props.layer

  componentWillUpdate: ( nextProps )->

    return if _.isEqual nextProps.layer, @props.layer

    @updateLayer 'layer', nextProps.layer

  renderLayerLayer: ->=

    { classed } = this

    <div
      {... @omitProps() }
      className={ classed '.' }
    />

  render: ->=

    null


module.exports = Layer
