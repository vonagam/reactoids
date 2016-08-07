# various

createGraphics = requireSource 'wrappers/pixi/helpers/createGraphics'


PROPS =

  'path': []

##


Polygon = createGraphics 'Polygon',

  updateGraphics: ( that, prevProps, nextProps )->=

    ! _.isEqual nextProps.path, prevProps.path

  ##

  drawGraphics: ( that, props )->

    that.pixi.drawPolygon ( props.path || [] )

  ##

##


module.exports = Polygon
