BaseListenerMixin = require '../mixins/BaseListener'


BASE_LISTENER_ARGS = {

  name: 'event'

  multiply: true

  init: ( that, listener )->

    listener.target ||= document

    return

  toggle: ( listener, bool )->

    target[ if bool then 'addEventListener' else 'removeEventListener' ] listener.event, listener.callback

    return

}


mixin = BaseListenerMixin BASE_LISTENER_ARGS


module.exports = mixin
