createGraphics = requireSource 'renderers/pixi/helpers/createGraphics'


PROPS =

  radius: 0


Circle = createGraphics 'Circle',

  updateGraphics: ( that, prevProps, nextProps )->=

    if nextProps.radius != prevProps.radius

      that.pixi.radius = nextProps.radius || 0

      true

    else
      
      false

  drawGraphics: ( that )->

    that.pixi.drawCircle 0, 0, that.pixi.radius


module.exports = Circle
