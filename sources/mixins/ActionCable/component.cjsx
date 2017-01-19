# mixins

ActionCableMixin = requireSource 'mixins/ActionCable'

ConstantPropsMixin = requireSource 'mixins/ConstantProps'

FuncedChildRenderMixin = requireSource 'mixins/FuncedChildRender'


ActionCable = React.createClass {

  mixins: [

    ActionCableMixin {

      url: ( that )->= _.funced @props.url, that

      timeout: ( that )->= _.funced @props.timeout, that

    }

    ConstantPropsMixin keys: [ 'url' ]

    FuncedChildRenderMixin()

  ]

  propTypes: ActionCableMixin.args

  getDefaultProps: ActionCableMixin.defaults

}


module.exports = ActionCable
