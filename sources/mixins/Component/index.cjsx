Mixin = requireSource 'various/Mixin'

PureRenderMixin = requireSource 'mixins/PureRender'
OmitPropsMixin = requireSource 'mixins/OmitProps'
ClassedMixin = requireSource 'mixins/Classed'
DomMixin = requireSource 'mixins/Dom'


mixin = Mixin.createArged

  mixins: [ PureRenderMixin, OmitPropsMixin, ClassedMixin, DomMixin ]

  mixin: ( ARGS )->=

    mixins: [ PureRenderMixin, OmitPropsMixin(), ClassedMixin( ClassedMixin.pick( ARGS ) ), DomMixin ]


module.exports = mixin
