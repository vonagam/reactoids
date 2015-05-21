getTimerFuns = ( constructor, destructor, keeper )->

  set: ( name, args... )->

    id = @[ keeper ][ name ]
    destructor id if id

    id = constructor.apply null, args
    @[ keeper ][ name ] = id

    return id

  clear: ( name )->

    id = @[ keeper ][ name ]
    return unless id
    destructor id
    delete @[ keeper ][ name ]

    return


interval = getTimerFuns setInterval, clearInterval, 'intervals'
timeout = getTimerFuns setTimeout, clearTimeout, 'timeouts'


mixin =

  componentWillMount: ->

    @intervals = []
    @timeouts = []

    return
  
  setInterval: interval.set
  clearInterval: interval.clear

  setTimeout: timeout.set
  clearTimeout: timeout.clear
  
  componentWillUnmount: ->

    clearInterval id for key, id of @intervals
    clearTimeout id for key, id of @timeouts

    return


React.mixins.add 'timer', mixin
