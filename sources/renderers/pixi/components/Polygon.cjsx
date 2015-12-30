createGraphics = requireSource 'renderers/pixi/helpers/createGraphics'


PROPS =

  path: []


Polygon = createGraphics 'Polygon',

  updateGraphics: ( that, prevProps, nextProps )->=

    if nextProps.path != prevProps.path || nextProps.radiusY != prevProps.radiusY

      that.pixi.path = nextProps.path || []

      true

    else

      false

  drawGraphics: ( that )->

    that.pixi.drawPolygon that.pixi.path


module.exports = Polygon
