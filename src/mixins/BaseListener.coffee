mixin = ( ARGS )->

  # name
  # multiply
  # init ( that, listener )->
  # toggle ( that, listener, bool )->

  ARGS = _.defaults {}, ARGS, {

    init: _.noop

  }


  method = _.capitalize _.camelCase "#{ ARGS.name }Listener"
  member = _.camelCase "#{ method }#{ if ARGS.multiply then 's' else '' }"


  toggleListener = ( that, listener, bool )->

    return if listener.turned == bool

    ARGS.toggle that, listener, bool

    listener.turned = bool

    return


  if ARGS.multiply

    getInitialMembers: ->

      "#{ member }": {}
    
    "add#{ method }": ( key, listener )->

      listeners = @[ member ]

      if arguments.length < 2

        listener = key
        
        key = _.uniqueId '_listener_'

      if listeners[ key ]

        console.log "listener with #{ key } already exists"
        
        @[ "remove#{ method }" ]( key )

      ARGS.init that, listener

      listeners[ key ] = listener

      unless listener.turned == false

        listener.turned = false

        toggleListener this, listener, true 
      
      return
    
    "remove#{ method }": ( key )->

      listeners = @[ member ]

      listener = listeners[ key ]
      
      return unless listener

      toggleListener this, listener, false

      delete listeners[ key ]

      return
    
    "toggle#{ method }": ( key, bool )->

      listener = @[ member ][ key ]

      toggleListener this, listener, bool

      return
    
    componentWillUnmount: ->

      listeners = @[ member ]

      _.each listeners, ( listener )=>

        toggleListener this, listener, false

        return
      
      return

  else

    getInitialMembers: ->

      "#{ member }": undefined
    
    "add#{ method }": ( listener )->

      if @listener

        console.log "listener already exists"
        
        @[ "remove#{ method }" ]()

      ARGS.init that, listener

      @[ member ] = listener

      unless listener.turned == false

        listener.turned = false

        toggleListener this, listener, true 
      
      return
    
    "remove#{ method }": ->

      listener = @[ member ]
      
      return unless listener

      toggleListener this, listener, false

      @[ member ] = undefined

      return
    
    "toggle#{ method }": ( bool )->

      listener = @[ member ]

      toggleListener this, listener, bool if listener

      return
    
    componentWillUnmount: ->

      listener = @[ member ]

      toggleListener this, listener, false if listener
      
      return


module.exports = mixin
