toggleListener = ( listener, bool )->

  if bool

    return if listener.turned
    listener.turned = true

    listener.target.addEventListener listener.event, listener.callback


  else

    return unless listener.turned
    listener.turned = false

    listener.target.removeEventListener listener.event, listener.callback

  return


mixin =

  componentWillMount: ->

    @listeners = {}

    return
  
  addListener: ( key, listener )->

    listener.target ||= document

    if @listeners[ key ]

      console.log "listener with #{ key } already exists"
      
      @removeListener key

    @listeners[ key ] = listener

    toggleListener listener, true unless listener.turned == false
    
    return
  
  removeListener: ( key )->

    listener = @listeners[ key ]
    
    return unless listener

    toggleListener listener, false

    delete @listeners[ key ]

    return
  
  toggleListener: ( key, bool )->

    bool = ! @listeners[ key ].turned if arguments.length == 1

    toggleListener @listeners[ key ], bool

    return
  
  componentWillUnmount: ->

    for key, listener of @listeners

      toggleListener listener, false
    
    return


React.mixins.add 'listener', mixin
