createGraphics = requireSource 'renderers/pixi/helpers/createGraphics'


PROPS =

  'w': 0
  'h': 0

##


Rectangle = createGraphics 'Rectangle',

  updateGraphics: ( that, prevProps, nextProps )->=

    nextProps.w != prevProps.w || nextProps.h != prevProps.h

  ##

  drawGraphics: ( that, props )->

    that.pixi.drawRect 0, 0, ( props.w || 0 ), ( props.h || 0 )

  ##

##


module.exports = Rectangle
