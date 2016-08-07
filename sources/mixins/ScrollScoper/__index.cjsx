# mixins

EventListenerMixin = requireSource 'mixins/EventListener'


mixin =

  Mixin.createPlain {

    mixins: [ EventListenerMixin ]

    componentDidMount: ->

      @addEventListener 'scroll', event: 'scroll', callback: _.bind ( event )->

        node = ReactDOM.findDOMNode this

        return unless node == event.target

        event.preventDefault()

        event.stopPropagation()

      , this

    ##

  }

##


module.exports = mixin
