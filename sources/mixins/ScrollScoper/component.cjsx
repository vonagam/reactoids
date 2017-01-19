# mixins

ScrollScoperMixin = requireSource 'mixins/ScrollScroper'

SingleChildRenderMixin = requireSource 'mixins/SingleChildRender'


ScrollScroper = React.createClass {

  mixins: Mixin.resolve [

    ScrollScoperMixin()

    SingleChildRenderMixin()

  ]

}


module.exports = ScrollScroper
