createNode = requireSource 'renderers/pixi/helpers/createNode'


PROPS =

  text: ''
  font: undefined
  tint: 0xFFFFFF
  align: 'left'
  maxWidth: 0



BitmapText = createNode 'BitmapText',

  createPixi: ( that, props )->=

    new PIXI.extras.BitmapText '', {}

  updatePixi: ( that, prevProps, nextProps )->

    that.applyRootPixiProps that.pixi, PROPS, prevProps, nextProps


module.exports = BitmapText
