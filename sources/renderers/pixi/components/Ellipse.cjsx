createGraphics = requireSource 'renderers/pixi/helpers/createGraphics'


PROPS =

  'radiusX': 0
  'radiusY': 0

##


Ellipse = createGraphics 'Ellipse',

  updateGraphics: ( that, prevProps, nextProps )->=

    nextProps.radiusX != prevProps.radiusX || nextProps.radiusY != prevProps.radiusY

  ##

  drawGraphics: ( that, props )->

    that.pixi.drawEllipse 0, 0, ( props.radiusX || 0 ), ( props.radiusY || 0 )

  ##

##


module.exports = Ellipse
