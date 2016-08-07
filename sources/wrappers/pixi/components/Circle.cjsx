# various

createGraphics = requireSource 'wrappers/pixi/helpers/createGraphics'


PROPS =

  'radius': 0

##


Circle = createGraphics 'Circle',

  updateGraphics: ( that, prevProps, nextProps )->=

    nextProps.radius != prevProps.radius

  ##

  drawGraphics: ( that, props )->

    that.pixi.drawCircle 0, 0, ( props.radius || 0 )

  ##

##


module.exports = Circle
