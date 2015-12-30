createGraphics = requireSource 'renderers/pixi/helpers/createGraphics'


PROPS =

  w: 0
  h: 0
  r: 0


RoundedRectangle = createGraphics 'RoundedRectangle',

  updateGraphics: ( that, prevProps, nextProps )->=

    if nextProps.w != prevProps.w || nextProps.h != prevProps.h || nextProps.r != prevProps.r

      that.pixi.w = nextProps.w || 0
      that.pixi.h = nextProps.h || 0
      that.pixi.r = nextProps.r || 0

      true

    else

      false

  drawGraphics: ( that )->

    that.pixi.drawRoundedRectangle 0, 0, that.pixi.w, that.pixi.h, that.pixi.r


module.exports = RoundedRectangle
