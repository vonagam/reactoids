# mixins

PixiNodeMixin = requireSource 'wrappers/pixi/mixins/Node'

# various

createComponent = requireSource 'various/CustomRender/createComponent'



createNode = ( name, ARGS )->=

  createComponent

    displayName: "PIXI:#{ name }"

    mixins: [ PixiNodeMixin ARGS ]

  ##

##



module.exports = createNode
