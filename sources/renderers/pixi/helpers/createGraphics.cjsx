createComponent = requireSource 'renderers/base/createComponent'

PixiGraphicsMixin = requireSource 'renderers/pixi/mixins/Graphics'



createGraphics = ( name, ARGS )->=

  createComponent

    displayName: "PIXI:#{ name }"

    mixins: [ PixiGraphicsMixin ARGS ]



module.exports = createGraphics
