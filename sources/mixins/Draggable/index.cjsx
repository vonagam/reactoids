Mixin = requireSource 'various/Mixin'

EventListener = requireSource 'mixins/EventListener'


mixin = Mixin.createArged

  args:

    onMove: React.PropTypes.func # ( that, position )->
    onStart: React.PropTypes.func # ( that, position )->
    onStop: React.PropTypes.func # ( that, position )->

  defaults:

    onStart: _.noop
    onStop: _.noop

  mixins: [ EventListener ]

  mixin: ( ARGS )->=

    getPosition = ( event )->=

      x: event.clientX
      y: event.clientY

    onMove = ( that, event )->

      event.preventDefault()
      
      ARGS.onMove that, getPosition event


    mixins: [ EventListener ]

    getInitialState: ->=

      dragging: false

    componentWillMount: ->

      @addEventListener 'draggableMousemove', event: 'mousemove', callback: _.partial( onMove, this ), turned: false
      @addEventListener 'draggableMouseup', event: 'mouseup', callback: @stopDragging, turned: false

    componentWillUpdate: ( nextProps, nextState )->

      if nextState.dragging != @state.dragging

        @toggleEventListener 'draggableMousemove', nextState.dragging
        @toggleEventListener 'draggableMouseup', nextState.dragging

    startDragging: ( event )->

      @setState dragging: true

      position = event && getPosition event
      
      ARGS.onStart this, position
      
      ARGS.onMove this, position

    stopDragging: ( event )->
      
      @setState dragging: false

      position = event && getPosition event
      
      ARGS.onMove this, position

      ARGS.onStop this, position


module.exports = mixin
