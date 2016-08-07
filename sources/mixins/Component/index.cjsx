# mixins

PureRenderMixin = requireSource 'mixins/PureRender'

OmitPropsMixin = requireSource 'mixins/OmitProps'

ClassedMixin = requireSource 'mixins/Classed'

DomMixin = requireSource 'mixins/Dom'

CacheMixin = requireSource 'mixins/Cache'

CallbackMixin = requireSource 'mixins/Callback'


mixin = Mixin.createArged

  mixins: [ PureRenderMixin, OmitPropsMixin, ClassedMixin, DomMixin, CacheMixin, CallbackMixin ]

  mixin: ( ARGS )->=

    mixins: [ PureRenderMixin, OmitPropsMixin(), ClassedMixin( ClassedMixin.pick( ARGS ) ), DomMixin, CacheMixin, CallbackMixin ]

  ##

##


module.exports = mixin
