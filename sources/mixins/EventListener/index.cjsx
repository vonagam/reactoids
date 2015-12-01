BaseListenerMixin = requireSource 'mixins/BaseListener'


mixin = BaseListenerMixin

  name: 'event'

  multiplyListeners: true

  initListener: ( that, listener )->

    listener.target ||= document

  toggleListener: ( that, listener, bool )->

    listener.target[ if bool then 'addEventListener' else 'removeEventListener' ](

      listener.event
      listener.callback

    )


module.exports = mixin
