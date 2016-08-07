# mixins

LayeredMixin = requireSource 'mixins/Layered'

StringedMixin = requireSource 'mixins/Stringed'


Layer = React.createClass {

  mixins: Mixin.resolve [

    ComponentMixin {

      classes: {}

    }

    StringedMixin strings: []

    LayeredMixin()

  ]

  propTypes: {

    'layer': React.PropTypes.shape {

      'root': React.PropTypes.funced React.PropTypes.any # ->= # CAUTION isEqual doesn't know how to compare functions

      'order': React.PropTypes.number

      'decorateContainer': React.PropTypes.func # ( container )-> # CAUTION isEqual doesn't know how to compare functions

    }

  }

  componentWillMount: ->

    @addLayer '', @props.layer

  ##

  componentWillUpdate: ( nextProps )->

    return if _.isEqual nextProps.layer, @props.layer

    @updateLayer '', nextProps.layer

  ##

  renderLayer: ->=

    { context, classed } = this


    <div

      {... @omitProps() }

      className={ classed '.' }

    />

  ##

  render: ->=

    null

  ##

}


module.exports = Layer
