watchers = []

interval = undefined

curLocation = undefined



#if ! __ReactoidsOnServer

pickLocation = ->=

  _.pick window.location, [ 'href', 'protocol', 'host', 'hostname', 'port', 'pathname', 'search', 'hash' ]

###
else

  serverSide = requireSource 'serverSide'

  pickLocation = ->=

    href: serverSide.href
###


intervalFunc = ->

  newLocation = pickLocation()

  return if newLocation.href == curLocation.href

  _.each watchers, ( watcher )->

    watcher newLocation, curLocation

  curLocation = newLocation


initWatch = ->

  curLocation = pickLocation()

  interval = setInterval intervalFunc, 50


stopWatch = ->

  clearInterval interval

  curLocation = undefined

  interval = undefined


toggleWatcher = ( watcher, bool = true )->

  return if bool == _.include watchers, watcher

  if bool
    
    watchers.push watcher

    initWatch() unless interval

  else

    _.pull watchers, watcher

    stopWatch() if watchers.length == 0


module.exports = toggleWatcher
