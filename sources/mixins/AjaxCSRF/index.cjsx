$ = requireDependency 'jquery'

EventListenerMixin = requireSource 'mixins/EventListener'


mixin = Mixin.createArged

  args:

    getToken: React.PropTypes.func # ( that, options )->=

  mixins: [ EventListenerMixin ]

  mixin: ( ARGS )->=

    mixins: [ EventListenerMixin ]

    componentWillMount: ->

      @addEventListener 'AjaxCSRF', event: 'ajaxSend', callback: ( event, xhr, options )->

        return if options.crossDomain

        token = ARGS.getToken this, options

        return unless token

        xhr.setRequestHeader 'X-CSRF-Token', token


module.exports = mixin
