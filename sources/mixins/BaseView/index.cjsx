# dependencies

$ = requireDependency 'jquery' # jquery/jquery, http://jquery.com

Location = requireWindow 'location' # https://developer.mozilla.org/en-US/docs/Web/API/Location

# mixins

EventListenerMixin = requireSource 'mixins/EventListener'


BaseViewMixin = Mixin.create {

  name: 'BaseViewMixin'

  args: {

    'shouldHandleLink': React.PropTypes.func # ( that, link )->= bool

    'handleLink': React.PropTypes.func # ( that, link )->= true if handled

  }

  defaults: {

    'shouldHandleLink': ( that, link )->=

      return false unless /^https?:$/.test link.protocol

      return false if link.target && link.target != '_self'

      return false if link.host != Location.host

      return true

    ##

  }

  mixins: [

    EventListenerMixin

  ]

  mixin: ( ARGS )->=

    mixins: [

      EventListenerMixin()

    ]

    componentDidMount: ->

      @addEventListener 'BaseViewMixin', {

        target: ReactDOM.findDOMNode this

        event: 'click'

        selector: 'a[href]'

        callback: _.bind ( event )->

          link = event.currentTarget

          return unless ARGS.shouldHandleLink this, link

          handled = ARGS.handleLink this, link

          event.preventDefault() if handled

        , this

      }

    ##

  ##

}


module.exports = BaseViewMixin
