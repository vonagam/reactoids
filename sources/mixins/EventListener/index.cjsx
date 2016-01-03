$ = requireDependency 'jquery'

BaseListenerMixin = requireSource 'mixins/BaseListener'


mixin = BaseListenerMixin

  name: 'event'

  multiplyListeners: true

  initListener: ( that, listener )->

    listener.target ||= document

    listener.$target = $ listener.target

    listener.callback = _.bind listener.callback, that

  toggleListener: ( that, listener, bool )->

    listener.$target[ if bool then 'on' else 'off' ]( listener.event, listener.callback )


module.exports = mixin
