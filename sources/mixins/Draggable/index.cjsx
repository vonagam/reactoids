# mixins

EventListenerMixin = requireSource 'mixins/EventListener'


DraggableMixin = Mixin.create {

  name: 'DraggableMixin'

  args: {

    'onMove': React.PropTypes.func # ( that, position )->

    'onStart': React.PropTypes.func # ( that, position )->

    'onStop': React.PropTypes.func # ( that, position )->

  }

  defaults: {

    'onStart': _.noop

    'onStop': _.noop

  }

  mixins: [

    EventListenerMixin

  ]

  mixin: ( ARGS )->=

    getPosition = ( event )->=

      x: event.clientX

      y: event.clientY

    ##


    mixins: [

      EventListenerMixin()

    ]

    getInitialState: ->=

      'dragging': false

    ##

    componentWillMount: ->

      @addEventListener 'draggableMousemove', event: 'mousemove', callback: @doDragging, turned: false

      @addEventListener 'draggableMouseup', event: 'mouseup', callback: @stopDragging, turned: false

      @addEventListener 'draggableMouseleave', event: 'mouseleave', callback: @stopDragging, turned: false

    ##

    componentWillUpdate: ( nextProps, nextState )->

      if nextState.dragging != @state.dragging

        @toggleEventListener 'draggableMousemove', nextState.dragging

        @toggleEventListener 'draggableMouseup', nextState.dragging

        @toggleEventListener 'draggableMouseleave', nextState.dragging

      ##

    ##

    startDragging: ( event )->

      return if @state.dragging == true

      @setState dragging: true

      position = event && getPosition event

      ARGS.onStart this, position

      ARGS.onMove this, position

    ##

    doDragging: ( event )->

      return if @state.dragging == false

      ARGS.onMove this, getPosition event

      event.preventDefault()

    ##

    stopDragging: ( event )->

      return if @state.dragging == false

      @setState dragging: false

      position = event && getPosition event

      ARGS.onMove this, position

      ARGS.onStop this, position

    ##

  ##

}


module.exports = DraggableMixin
