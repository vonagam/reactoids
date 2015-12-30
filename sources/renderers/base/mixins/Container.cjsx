Mixin = requireSource 'various/Mixin'

ReactMultiChild = require 'react/lib/ReactMultiChild'


mixin = Mixin.createArged

  args:

    containerAttach: React.PropTypes.func # ( that, image )->=
    containerDetach: React.PropTypes.func # ( that, image )->=
    containerMove: React.PropTypes.func # ( that, image, toIndex )->=

  mixin: ( ARGS )->=

    _.assign {}, ReactMultiChild.Mixin,

      createChild: ( child, mountImage )->

        child._mountImage = mountImage

        ARGS.containerAttach this, mountImage

      removeChild: ( child )->

        ARGS.containerDetach this, child._mountImage

        child._mountImage = null

      moveChild: ( child, toIndex )->

        ARGS.containerMove this, child._mountImage, toIndex

      # Override to bypass batch updating because it is not necessary ???

      updateChildren: ( children, transaction, context )->

        @_updateChildren children, transaction, context

      mountAndCreateChildren: ( children, transaction, context )->

        mountedImages = @mountChildren children, transaction, context

        i = 0

        for own key, child of @_renderedChildren

          @createChild child, mountedImages[ i ]

          i++


module.exports = mixin
