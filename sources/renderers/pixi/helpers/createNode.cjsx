createComponent = requireSource 'renderers/base/createComponent'

PixiNodeMixin = requireSource 'renderers/pixi/mixins/Node'



createNode = ( name, ARGS )->=

  createComponent

    displayName: "PIXI:#{ name }"

    mixins: [ PixiNodeMixin ARGS ]



module.exports = createNode
