createGraphics = requireSource 'renderers/pixi/helpers/createGraphics'


PROPS =

  w: 0
  h: 0


Rectangle = createGraphics 'Rectangle',

  updateGraphics: ( that, prevProps, nextProps )->=

    if nextProps.w != prevProps.w || nextProps.h != prevProps.h

      that.pixi.w = nextProps.w || 0
      that.pixi.h = nextProps.h || 0

      true

    else

      false

  drawGraphics: ( that )->

    that.pixi.drawRect 0, 0, that.pixi.w, that.pixi.h


module.exports = Rectangle
