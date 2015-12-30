createNode = requireSource 'renderers/pixi/helpers/createNode'


PROPS =

  texture: PIXI.Texture.EMPTY
  width: 0
  height: 0
  tint: 0xFFFFFF
  blendMode: PIXI.BLEND_MODES.NORMAL
  shader: null


Sprite = createNode 'Sprite',

  createPixi: ( that, props )->=

    new PIXI.Sprite

  updatePixi: ( that, prevProps, nextProps )->

    that.applyRootPixiProps that.pixi, PROPS, prevProps, nextProps


module.exports = Sprite
