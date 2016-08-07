# mixins

PixiGraphicsMixin = requireSource 'wrappers/pixi/mixins/Graphics'

# various

createComponent = requireSource 'various/CustomRender/createComponent'



createGraphics = ( name, ARGS )->=

  createComponent

    displayName: "PIXI:#{ name }"

    mixins: [ PixiGraphicsMixin ARGS ]

  ##

##



module.exports = createGraphics
