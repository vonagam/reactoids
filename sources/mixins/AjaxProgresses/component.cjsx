# mixins

AjaxProgressesMixin = requireSource 'mixins/AjaxProgresses'

FuncedChildRenderMixin = requireSource 'mixins/FuncedChild'


AjaxProgresses = React.createClass {

  mixins: Mixin.resolve [

    AjaxProgressesMixin {

      filterRequest: ( that, xhr, options )->=

        requests = that.state.requests

        _.funced that.props.filterRequest, that, xhr, options, requests

      ##

      onRequestStart: ( that, request )->

        requests = _.clone that.state.requests

        requests[ request.id ] = _.clone request

        that.setState requests: requests

        _.funced that.props.onRequestStart, that, request, requests

      ##

      onRequestUpdate: ( that, request )->

        requests = _.clone that.state.requests

        requests[ request.id ] = _.clone request

        that.setState requests: requests

        _.funced that.props.onRequestUpdate, that, request, requests

      ##

      onRequestFinish: ( that, request )->

        requests = _.omit that.state.requests, request.id

        that.setState requests: requests

        _.funced that.props.onRequestFinish, that, request, requests

      ##

    }

    FuncedChildRenderMixin()

  ]

  propTypes: AjaxProgressesMixin.args

  getDefaultProps: AjaxProgressesMixin.defaults

  getInitialState: ->=

    'requests': {}

  ##

}


module.exports = AjaxProgresses
