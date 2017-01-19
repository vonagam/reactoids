BaseListenerMixin = Mixin.create {

  name: 'BaseListenerMixin'

  args: {

    'name': React.PropTypes.string

    'multiplyListeners': React.PropTypes.bool

    'initListener': React.PropTypes.func # ( that, listener )->

    'toggleListener': React.PropTypes.func # ( that, listener, bool )->

  }

  defaults: {

    'name': ''

    'multiplyListeners': false

    'initListener': _.noop

  }

  mixin: ( ARGS )->=

    method = _.pascalCase "#{ ARGS.name }Listener"

    member = _.camelCase "#{ method }#{ if ARGS.multiplyListeners then 's' else '' }"


    initListener = ( that, listener )->

      ARGS.initListener that, listener

      unless listener.turned == false

        listener.turned = false

        toggleListener that, listener, true

      ##

    ##

    toggleListener = ( that, listener, bool )->

      return if listener.turned == bool

      ARGS.toggleListener that, listener, bool

      listener.turned = bool

    ##


    if ARGS.multiplyListeners

      getInitialMembers: ->=

        "#{ member }": {}

      ##

      componentWillUnmount: ->

        listeners = @[ member ]

        _.each listeners, _.bind ( listener )->

          toggleListener this, listener, false

        , this

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

      "toggle#{ method }": ( key, bool )->

        listener = @[ member ][ key ]

        toggleListener this, listener, bool

      ##

      "remove#{ method }": ( key )->

        listeners = @[ member ]

        listener = listeners[ key ]

        return unless listener

        toggleListener this, listener, false

        delete listeners[ key ]

      ##

    else

      getInitialMembers: ->=

        "#{ member }": undefined

      ##

      componentWillUnmount: ->

        listener = @[ member ]

        toggleListener this, listener, false if listener

      ##

      "add#{ method }": ( listener )->

        if @[ member ]

          console.warn "listener already exists"

          @[ "remove#{ method }" ]()

        ##

        @[ member ] = listener

        initListener this, listener

      ##

      "toggle#{ method }": ( bool )->

        listener = @[ member ]

        toggleListener this, listener, bool if listener

      ##

      "remove#{ method }": ->

        listener = @[ member ]

        return unless listener

        toggleListener this, listener, false

        @[ member ] = undefined

      ##

    ##

  ##

}


module.exports = BaseListenerMixin
