LayeredMixin = Mixin.create {

  name: 'LayeredMixin'

  mixin: ->=

    LayerContextPasser = null


    ORDER_ATTRIBUTE = 'data-layer-order'

    attachLayer = ( layer )->

      return if layer.container


      div = document.createElement 'div'

      div.setAttribute ORDER_ATTRIBUTE, layer.order

      layer.decorateContainer div

      layer.container = div


      root = _.funced layer.root

      root.appendChild div


      children = _.filter root.children, ( node )->= node.getAttribute ORDER_ATTRIBUTE

      children = _.sortBy children, ( node )->= parseFloat node.getAttribute ORDER_ATTRIBUTE

      _.each children, ( node )-> root.appendChild node

    ##

    dettachLayer = ( layer )->

      return unless layer.container

      div = layer.container

      ReactDOM.unmountComponentAtNode div

      root = div.parentNode

      root.removeChild div

      delete layer.container

    ##

    removeLayer = ( that, layer, name )->

      dettachLayer layer

      delete that._layers[ name ]

    ##

    renderLayer = ( that, layer, name )->

      content = layer.content that

      switch

        when content

          attachLayer layer

          ReactDOM.render <LayerContextPasser that={ that } children={ content } />, layer.container

        when layer.temporary

          removeLayer that, layer, name

        else

          dettachLayer layer

        ##

      ##

    ##

    renderLayers = ( that )->

      _.each that._layers, ( layer, name )->

        renderLayer that, layer, name

      ##

    ##


    initConstants: ->

      { contextTypes, childContextTypes } = @constructor


      return LayerContextPasser = ( ( props )->= props.children ) unless contextTypes || childContextTypes


      LayerContextPasser = React.createClass {

        propTypes: {

          that: React.PropTypes.instanceOf @constructor

        }

        childContextTypes: _.assign {}, contextTypes, childContextTypes

        getChildContext: ->=

          { that } = @props

          context = {}

          _.assign context, _.pick( that.context, _.keys contextTypes ) if contextTypes

          _.assign context, that.getChildContext() if childContextTypes

          context

        ##

        render: ->=

          children = @props.children

          children && React.Children.only children

        ##

      }

    ##

    getInitialMembers: ->=

      '_layers': {}

    ##

    componentDidMount: ->

      renderLayers this

    ##

    componentDidUpdate: ->

      renderLayers this

    ##

    componentWillUnmount: ->

      _.each @_layers, dettachLayer

    ##

    addLayer: ( name, options )->

      layer = _.defaults {}, options, {

        'root': ->= document.getElementsByTagName( 'body' )[ 0 ]

        'content': @[ "render#{ _.pascalCase name }Layer" ]

        'order': 0

        'temporary': false

        'decorateContainer': _.noop

      }

      @_layers[ name ] = layer

      renderLayer this, layer, name if @isMounted()

    ##

    updateLayer: ( name, options )->

      layer = @_layers[ name ]

      throw new Error "LayeredMixin: layer with name '#{ name }' does not exist" unless layer

      dettachLayer layer

      _.assign layer, options

      @forceUpdate()

    ##

  ##

}


module.exports = LayeredMixin
