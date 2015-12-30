createGraphics = requireSource 'renderers/pixi/helpers/createGraphics'


PROPS =

  radiusX: 0
  radiusY: 0


Ellipse = createGraphics 'Ellipse',

  updateGraphics: ( that, prevProps, nextProps )->=

    if nextProps.radiusX != prevProps.radiusX || nextProps.radiusY != prevProps.radiusY

      that.pixi.radiusX = nextProps.radiusX || 0
      that.pixi.radiusY = nextProps.radiusY || 0

      true

    else

      false

  drawGraphics: ( that )->

    that.pixi.drawEllipse 0, 0, that.pixi.radiusX, that.pixi.radiusY


module.exports = Ellipse
