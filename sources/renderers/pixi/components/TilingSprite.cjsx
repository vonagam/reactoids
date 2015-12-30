createNode = requireSource 'renderers/pixi/helpers/createNode'


PROPS =

  texture: PIXI.Texture.EMPTY
  width: 100
  height: 100
  tileScale: new PIXI.Point 1, 1
  tilePosition: new PIXI.Point 0, 0
  tint: 0xFFFFFF
  blendMode: PIXI.BLEND_MODES.NORMAL


TilingSprite = createNode 'TilingSprite',

  createPixi: ( that, props )->=

    new PIXI.extras.TilingSprite

  updatePixi: ( that, prevProps, nextProps )->

    that.applyRootPixiProps that.pixi, PROPS, prevProps, nextProps


module.exports = TilingSprite
