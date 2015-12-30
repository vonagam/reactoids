createNode = requireSource 'renderers/pixi/helpers/createNode'


PROPS =

  textures: [ PIXI.Texture.EMPTY ]
  animationSpeed: 1
  loop: true
  onComplete: null
  #playing

  width: 0
  height: 0
  tint: 0xFFFFFF
  blendMode: PIXI.BLEND_MODES.NORMAL
  shader: null


MovieClip = createNode 'MovieClip',

  createPixi: ( that, props )->=

    new PIXI.extras.MovieClip []

  updatePixi: ( that, prevProps, nextProps )->

    that.applyRootPixiProps that.pixi, PROPS, prevProps, nextProps

    if nextProps.playing != prevProps.playing

      if nextProps.playing

        that.pixi.play()

      else 

        that.pixi.stop()


module.exports = MovieClip
