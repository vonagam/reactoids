# mixins

AjaxMixin = requireSource 'mixins/Ajax'

FuncedChildRenderMixin = requireSource 'mixins/FuncedChildRender'


Ajax = React.createClass {

  mixins: [

    AjaxMixin()

    FuncedChildRenderMixin()

  ]

}


module.exports = Ajax
