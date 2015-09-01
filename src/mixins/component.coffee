PureRenderMixin = require '../mixins/PureRender'
OmitPropsMixin = require '../mixins/OmitProps'
ClassedMixin = require '../mixins/Classed'
FindDOMMixin = require '../mixins/FindDOM'
BMixin = require '../mixins/B'


mixin =

  mixins: [ PureRenderMixin, OmitPropsMixin, ClassedMixin, FindDOMMixin, BMixin ]


module.exports = mixin
