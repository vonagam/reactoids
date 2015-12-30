Mixin = requireSource 'various/Mixin'

PixiNodeMixin = requireSource 'renderers/pixi/mixins/Node'


COMMON_PROPS =

  width: 0
  height: 0
  tint: 0xFFFFFF
  blendMode: PIXI.BLEND_MODES.NORMAL
  isMask: false
  boundsPadding: 0

GRAPHICS_PROPS =

  fillColor: 0
  fillAlpha: 1
  lineWidth: 0
  lineColor: 0
  lineAlpha: 1


mixin = Mixin.createArged

  args:

    updateGraphics: React.PropTypes.func # ( that, prevProps, nextProps )->= bool ( true if changed )

    drawGraphics: React.PropTypes.func # ( that )->

  mixins: [ PixiNodeMixin ]

  mixin: ( ARGS )->=

    PixiNodeArgs =

      createPixi: ( that, props )->=

        graphics = new PIXI.Graphics()

        graphics.settings = {}

        graphics

      updatePixi: ( that, prevProps, nextProps )->

        pixi = that.pixi

        that.applyRootPixiProps pixi, COMMON_PROPS, prevProps, nextProps

        a = that.applyRootPixiProps pixi.settings, GRAPHICS_PROPS, prevProps, nextProps

        b = ARGS.updateGraphics that, prevProps, nextProps

        if a || b

          pixi.clear()

          pixi.beginFill pixi.settings.fillColor, pixi.settings.fillAlpha

          pixi.lineStyle pixi.settings.lineWidth, pixi.settings.liceColor, pixi.settings.lineAlpha

          ARGS.drawGraphics that

          pixi.endFill()


    PixiNodeMixin PixiNodeArgs


module.exports = mixin
