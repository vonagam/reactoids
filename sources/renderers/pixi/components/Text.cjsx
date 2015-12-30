createNode = requireSource 'renderers/pixi/helpers/createNode'


PROPS =

  text: null
  resolution: PIXI.RESOLUTION
  width: 0
  height: 0
  tint: 0xFFFFFF
  blendMode: PIXI.BLEND_MODES.NORMAL
  shader: null


STYLE_PROPS =

  font: 'bold 20pt Arial'
  fill: 'black'
  align: 'left'
  stroke: 'black'
  strokeThickness: 0
  wordWrap: false
  wordWrapWidth: 100
  dropShadow: false
  dropShadowColor: '#000000'
  dropShadowAngle: Math.PI / 6
  dropShadowDistance: 5
  padding: 0
  textBaseline: 'alphabetic'
  lineJoin: 'miter'
  miterLimit: 10


COLORS_PROPS = [

  'fill'
  'stroke'
  'dropShadowColor'

]


Text = createNode 'Text',

  createPixi: ( that, props )->=

    new PIXI.Text '', {}

  updatePixi: ( that, prevProps, nextProps )->

    that.applyRootPixiProps that.pixi, PROPS, prevProps, nextProps

    if that.applyRootPixiProps that.pixi.style, STYLE_PROPS, prevProps, nextProps

      style = that.pixi.style

      for color in COLORS_PROPS

        if typeof style[ color ] == 'number'

          style[ color ] = PIXI.utils.hex2string style[ color ]

      that.pixi.dirty = true


module.exports = Text
