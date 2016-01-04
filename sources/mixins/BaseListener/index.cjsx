mixin = Mixin.createArged

  args:

    'name': React.PropTypes.string

    'multiplyListeners': React.PropTypes.bool

    'initListener': React.PropTypes.func # ( that, listener )->

    'toggleListener': React.PropTypes.func # ( that, listener, bool )->

  ##

  defaults:

    'name': ''

    'multiplyListeners': false

    'initListener': _.noop

  ##

  mixin: ( ARGS )->=

    method = _.capitalize _.camelCase "#{ ARGS.name }Listener"
    member = _.camelCase "#{ method }#{ if ARGS.multiplyListeners then 's' else '' }"


    toggleListener = ( that, listener, bool )->

      return if listener.turned == bool

      ARGS.toggleListener that, listener, bool

      listener.turned = bool

    ##

    initListener = ( that, listener )->

      ARGS.initListener that, listener

      unless listener.turned == false

        listener.turned = false

        toggleListener that, listener, true

      ##

    ##


    if ARGS.multiplyListeners

      getInitialMembers: ->=

        "#{ member }": {}

      ##

      "add#{ method }": ( key, listener )->

        listeners = @[ member ]

        if arguments.length < 2

          listener = key

          key = _.uniqueId '_listener_'

        ##

        if listeners[ key ]

          console.warn "listener with key '#{ key }' already exists"

          @[ "remove#{ method }" ]( key )

        ##

        listeners[ key ] = listener

        initListener this, listener

      ##

      "remove#{ method }": ( key )->

        listeners = @[ member ]

        listener = listeners[ key ]

        return unless listener

        toggleListener this, listener, false

        delete listeners[ key ]

      ##

      "toggle#{ method }": ( key, bool )->

        listener = @[ member ][ key ]

        toggleListener this, listener, bool

      ##

      componentWillUnmount: ->

        listeners = @[ member ]

        _.each listeners, ( listener )->

          toggleListener this, listener, false

        , this

    else

      getInitialMembers: ->=

        "#{ member }": undefined

      ##

      "add#{ method }": ( listener )->

        if @[ member ]

          console.warn "listener already exists"

          @[ "remove#{ method }" ]()

        ##

        @[ member ] = listener

        initListener this, listener

      ##

      "remove#{ method }": ->

        listener = @[ member ]

        return unless listener

        toggleListener this, listener, false

        @[ member ] = undefined

      ##

      "toggle#{ method }": ( bool )->

        listener = @[ member ]

        toggleListener this, listener, bool if listener

      ##

      componentWillUnmount: ->

        listener = @[ member ]

        toggleListener this, listener, false if listener

      ##

    ##

  ##

##


module.exports = mixin
