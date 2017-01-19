# mixins

AjaxHeadersMixin = requireSource 'mixins/AjaxHeaders'

NullRenderMixin = requireSource 'mixins/NullRender'


AjaxHeaders = React.createClass {

  mixins: [

    AjaxHeadersMixin {

      headers: ( that, options )->= _.funced that.props.headers, that, options

      filterRequest: ( that, options )->= that.props.filterRequest that, options

    }

    NullRenderMixin()

  ]

  propTypes: AjaxHeadersMixin.args

  getDefaultProps: AjaxHeadersMixin.defaults

}


module.exports = AjaxHeaders
