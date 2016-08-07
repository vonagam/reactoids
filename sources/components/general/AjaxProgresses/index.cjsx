# mixins

AjaxProgressesMixin = requireSource 'mixins/AjaxProgresses'

FuncedChildMixin = requireSource 'mixins/FuncedChild'


AjaxProgresses = React.createClass {

  mixins: Mixin.resolve [

    ComponentMixin {

      classes: {}

    }

    AjaxProgressesMixin {

      filterRequest: ( that, xhr, options )->=

        requests = that.state.requests

        _.funced that.props.filterRequest, xhr, options, requests

      ##

      onRequestChange: ( that, request )->

        requests = _.clone that.state.requests

        requests[ request.id ] = _.clone request

        that.setState requests: requests

        _.funced that.props.onRequestChange, request, requests

      ##

      onRequestRemove: ( that, request )->

        requests = _.omit that.state.requests, request.id

        that.setState requests: requests

        _.funced that.props.onRequestRemove, request, requests

      ##

    }

    FuncedChildMixin {

      getChildArgs: ( that )->=

        [ that.state.requests ]

      ##

    }

  ]

  propTypes: {

    'filterRequest': React.PropTypes.funced React.PropTypes.bool # ( that, xhr, options )->=

    'onRequestChange': React.PropTypes.func # ( that, request, requests )->

    'onRequestRemove': React.PropTypes.func # ( that, request, requests )->

  }

  getDefaultProps: ->=

    'filterRequest': true

  ##

  getInitialState: ->=

    requests: {}

  ##

}


module.exports = AjaxProgresses
