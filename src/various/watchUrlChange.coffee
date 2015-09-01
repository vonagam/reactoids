WATCH =

  watchers: []

  interval: undefined
  
  location: undefined

  pickLocation: ->

    _.pick window.location, [ 'hash', 'host', 'hostname', 'href', 'origin', 'pathname', 'port', 'protocol' ]

  intervalFunc: ->

    return unless window.location.href != @location.href

    oldLocation = @location

    newLocation = @pickLocation()

    _.each watchers, ( watcher )->

      watcher newLocation, oldLocation

    @location = newLocation

  initWatch: ->

    @location = @pickLocation()

    @interval = setInterval _.bind( @intervalFunc, this ), 50

  stopWatch: ->

    clearInterval @interval

    @location = undefined

    @interval = undefined

  toggleWatcher: ( watcher, bool )->

    return if bool == _.include @watchers, watcher

    if bool
      
      @watchers.push watcher

      @initWatch() unless @interval

    else

      _.pull @watchers, watcher

      @stopWatch() if @watchers.length == 0


module.exports = _.bind WATCH.toggleWatcher, WATCH
