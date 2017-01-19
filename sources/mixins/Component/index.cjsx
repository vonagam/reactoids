# mixins

PureRenderMixin = requireSource 'mixins/PureRender'

StateKeyMixin = requireSource 'mixins/StateKey'

OmitPropsMixin = requireSource 'mixins/OmitProps'

DomMixin = requireSource 'mixins/Dom'

ClassedMixin = requireSource 'mixins/Classed'

CallbackMixin = requireSource 'mixins/Callback'

CacheMixin = requireSource 'mixins/Cache'


ComponentMixin = Mixin.create {

  name: 'ComponentMixin'

  mixins: [

    PureRenderMixin

    StateKeyMixin

    OmitPropsMixin

    DomMixin

    ClassedMixin

    CallbackMixin

    CacheMixin

  ]

  mixin: ( ARGS )->=

    mixins: [

      PureRenderMixin()

      StateKeyMixin()

      OmitPropsMixin()

      DomMixin()

      ClassedMixin ClassedMixin.pick ARGS

      CallbackMixin()

      CacheMixin()

    ]

  ##

}


module.exports = ComponentMixin
