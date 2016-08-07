# various

createGraphics = requireSource 'wrappers/pixi/helpers/createGraphics'


PROPS =

  'w': 0
  'h': 0
  'r': 0

##


RoundedRectangle = createGraphics 'RoundedRectangle',

  updateGraphics: ( that, prevProps, nextProps )->=

    nextProps.w != prevProps.w || nextProps.h != prevProps.h || nextProps.r != prevProps.r

  ##

  drawGraphics: ( that, props )->

    that.pixi.drawRoundedRectangle 0, 0, ( props.w || 0 ), ( props.h || 0 ), ( props.r || 0 )

  ##

##


module.exports = RoundedRectangle
