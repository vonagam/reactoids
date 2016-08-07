# dependencies

$ = requireDependency 'jquery' # jquery/jquery, http://jquery.com

# mixins

BaseListenerMixin = requireSource 'mixins/BaseListener'


mixin = BaseListenerMixin

  name: 'event'

  multiplyListeners: true

  initListener: ( that, listener )->

    listener.target ||= document

    listener.target = $ listener.target unless listener.jquery == false

    listener.callback = _.bind listener.callback, that unless listener.bind == false

  ##

  toggleListener: ( that, listener, bool )->

    if listener.jquery == false

      listener.target[ if bool then 'addEventListener' else 'removeEventListener' ]( listener.event, listener.callback )

    else

      listener.target[ if bool then 'on' else 'off' ]( listener.event, listener.callback )

    ##

  ##

##


module.exports = mixin
