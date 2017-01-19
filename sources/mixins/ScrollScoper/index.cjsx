# dependencies

$ = requireDependency 'jquery' # jquery/jquery, http://jquery.com

# mixins

EventListenerMixin = requireSource 'mixins/EventListener'


ScrollScroperMixin = Mixin.create {

  name: 'ScrollScroperMixin'

  args: {

    'getNode': React.PropTypes.func # ( that )->= node

  }

  defaults: {

    'getNode': ( that )->= ReactDOM.findDOMNode this

  }

  mixins: [

    EventListenerMixin

  ]

  mixin: ( ARGS )->=

    mixins: [

      EventListenerMixin()

    ]

    componentDidMount: ->

      @addEventListener 'ScrollScroper', event: 'mousewheel DOMMouseScroll', callback: _.bind ( event )->

        node = ARGS.getNode this

        return unless node == event.target


        offsetHeight = $( node ).height()

        scrollHeight = node.scrollHeight

        scrollPosition = $( node ).scrollTop()

        scrollDelta = if event.type == 'mousewheel' then event.originalEvent.wheelDelta * -1 else event.originalEvent.detail * 20


        if scrollDelta > 0 && scrollPosition + scrollDelta + offsetHeight > scrollHeight

          event.preventDefault()

          event.stopPropagation()

        ##


        if scrollDelta < 0 && scrollPosition + scrollDelta < 0

          event.preventDefault()

          event.stopPropagation()

        ##

      , this

    ##

  ##

}


module.exports = ScrollScroperMixin
