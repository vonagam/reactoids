Mixin = requireSource 'various/Mixin'


getTimerFuns = ( constructor, destructor, member )->=

  set: ( key, args... )->

    id = @[ member ][ key ]
    
    destructor id if id

    id = constructor.apply null, args
    
    @[ member ][ key ] = id

  clear: ( key )->

    id = @[ member ][ key ]
    
    return unless id
    
    destructor id
    
    delete @[ member ][ key ]


INTERVAL = getTimerFuns setInterval, clearInterval, 'intervals'
TIMEOUT = getTimerFuns setTimeout, clearTimeout, 'timeouts'


mixin =

  Mixin.createPlain

    getInitialMembers: ->=
      
      intervals: {}
      timeouts: {}
    
    setInterval: INTERVAL.set
    clearInterval: INTERVAL.clear

    setTimeout: TIMEOUT.set
    clearTimeout: TIMEOUT.clear
    
    componentWillUnmount: ->

      _.each @intervals, clearInterval
      _.each @timeouts, clearTimeout


module.exports = mixin
