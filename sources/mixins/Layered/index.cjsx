ORDER_ATTRIBUTE = 'data-layer-order'

attachLayer = ( layer )->

  return if layer.container
  
  div = document.createElement 'div'

  div.setAttribute ORDER_ATTRIBUTE, layer.order

  layer.decorateContainer div

  layer.container = div

  root = _.funced layer.root

  root.appendChild div

  _( root.children )
  
  .filter ( node )->= node.getAttribute ORDER_ATTRIBUTE
  
  .sortBy ( node )->= parseFloat node.getAttribute ORDER_ATTRIBUTE
  
  .each ( node )-> root.appendChild node
  
  .value()

dettachLayer = ( layer )->

  return unless layer.container

  div = layer.container
  
  ReactDOM.unmountComponentAtNode div

  root = div.parentNode
  
  root.removeChild div
  
  delete layer.container

removeLayer = ( that, layer, name )->

  dettachLayer layer

  delete that._layers[ name ]

renderLayer = ( that, layer, name )->

  content = layer.content that

  switch

    when content

      attachLayer layer
      
      ReactDOM.render content, layer.container

    when layer.temporary
      
      removeLayer that, layer, name

    else
      
      dettachLayer layer

renderLayers = ( that )->

  _.each that._layers, ( layer, name )-> 

    renderLayer that, layer, name

    
mixin =

  Mixin.createPlain

    getInitialMembers: ->=

      _layers: {}

    componentDidMount: ->

      renderLayers this

    componentDidUpdate: ->

      renderLayers this

    componentWillUnmount: ->

      _.each @_layers, dettachLayer

    addLayer: ( name, options )->

      layer = _.defaults {}, options, {

        root: ->= document.getElementsByTagName( 'body' )[ 0 ]
        content: @[ "render#{ _.capitalize _.camelCase name }Layer" ]
        order: 0
        temporary: false
        decorateContainer: _.noop

      }

      @_layers[ name ] = layer

      renderLayer this, layer if @isMounted()

    updateLayer: ( name, options )->

      layer = @_layers[ name ]

      throw new Error "LayeredMixin: layer with name '#{ name }' does not exist" unless layer

      dettachLayer layer

      _.assign layer, options

      @forceUpdate()


module.exports = mixin
