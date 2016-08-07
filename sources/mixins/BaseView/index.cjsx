# dependencies

$ = requireDependency 'jquery' # jquery/jquery, http://jquery.com

window = requireDependency 'window' # location


mixin = Mixin.createArged

  args:

    'shouldHandleLink': React.PropTypes.func # ( that, link )->= bool

    'handleLink': React.PropTypes.func # ( that, link )->= true if handled

  ##

  defaults:

    'shouldHandleLink': ( that, link )->=

      return false unless /^https?:$/.test link.protocol

      return false if link.target && link.target != '_self'

      return false if link.host != window.location.host

      return true

    ##

  ##

  mixin: ( ARGS )->=

    componentDidMount: ->

      $( ReactDOM.findDOMNode this ).on 'click', 'a[href]', _.bind ( event )->

        link = event.currentTarget

        return unless ARGS.shouldHandleLink this, link

        handled = ARGS.handleLink this, link

        event.preventDefault() if handled

      , this

    ##

  ##

##


module.exports = mixin
