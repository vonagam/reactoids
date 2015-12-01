Mixin = requireSource 'various/Mixin'


ORDER_ATTRIBUTE = 'data-layer-order'

attachLayer = ( layer )->

  return if layer.container
  
  div = document.createElement 'div'

  div.setAttribute ORDER_ATTRIBUTE, layer.order

  layer.decorateContainer div

  layer.container = div

  root = layer.root()

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

removeLayer = ( that, layer )->

  dettachLayer layer

  delete that._layers[ layer.name ]

renderLayer = ( that, layer )->

  content = layer.content that

  switch

    when content

      attachLayer layer
      
      ReactDOM.render content, layer.container

    when layer.temporary
      
      removeLayer that, layer

    else
      
      dettachLayer layer

renderLayers = ( that )->

  _.each that._layers, ( layer )-> 

    renderLayer that, layer

    
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

    addLayer: ( name, layer )->

      layer = _.defaults { name: name }, layer, {

        root: ->= document.getElementsByTagName( 'body' )[ 0 ]
        content: @[ "render#{ _.capitalize _.camelCase name }Layer" ]
        order: 0
        temporary: false
        decorateContainer: _.noop

      }

      @_layers[ layer.name ] = layer

      renderLayer this, layer


module.exports = mixin
