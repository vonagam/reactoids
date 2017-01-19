getTimerFuns = ( constructor, destructor, member )->=

  set: ( key, args... )->

    id = @[ member ][ key ]

    destructor id if id

    id = constructor.apply null, args

    @[ member ][ key ] = id

  ##

  clear: ( key )->

    id = @[ member ][ key ]

    return unless id

    destructor id

    delete @[ member ][ key ]

  ##

##

INTERVAL = getTimerFuns setInterval, clearInterval, 'intervals'

TIMEOUT = getTimerFuns setTimeout, clearTimeout, 'timeouts'


TimerMixin = Mixin.create {

  name: 'TimerMixin'

  mixin: _.once ->=

    getInitialMembers: ->=

      'intervals': {}

      'timeouts': {}

    ##

    componentWillUnmount: ->

      _.each @intervals, clearInterval

      _.each @timeouts, clearTimeout

    ##

    setInterval: INTERVAL.set

    clearInterval: INTERVAL.clear

    setTimeout: TIMEOUT.set

    clearTimeout: TIMEOUT.clear

  ##

}


module.exports = TimerMixin
