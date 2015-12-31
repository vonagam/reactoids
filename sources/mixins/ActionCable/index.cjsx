ActionCable = requireDependency 'actioncable'

Mixin = requireSource 'various/Mixin'

# TODO use something like crosstab to use only 1 connection between multiply tabs


mixin = Mixin.createArged

  args:

    url: React.PropTypes.string
    timeout: React.PropTypes.number

  defaults:

    url: '/cable'
    timeout: 1000

  mixin: ( ARGS )->=

    consumer = undefined

    count = 0

    timeoutId = undefined 

    openConnection = ->

      count += 1

      if ! consumer

        consumer = ActionCable.createConsumer ARGS.url

      else if count == 1 && consumer.connection.isState 'closed'

        consumer.connection.open()

    closeConnection = ->

      count -= 1

      if count == 0

        clearTimeout timeoutId

        timeoutId = setTimeout ->

          if count == 0 && ! consumer.connection.isState 'closed'

            consumer.connection.close()

        , ARGS.timeout


    getInitialMembers: ->=

      _cables: {}

    connectCable: ( name, channel, mixin )->

      if arguments.length == 2

        mixin = channel

        channel = name

        name = if _.isString channel then channel else channel.channel

      if mixin

        mixin = _.mapValues mixin, ( ( value )->= _.bind value, this ), this

      throw new Error "ActionCableMixin: cable with name '#{ name }' is already connected" if @_cables[ name ]

      openConnection()

      @_cables[ name ] = consumer.subscriptions.create channel, mixin

    disconnectCable: ( name )->

      throw new Error "ActionCableMixin: cable with name '#{ name }' is already disconnected" unless @_cables[ name ]

      @_cables[ name ].unsubscribe()

      delete @_cables[ name ]

      closeConnection()

    sendCable: ( name, data )->

      @_cables[ name ].send data

    performCable: ( name, action, data )->

      @_cables[ name ].perform action, data

    componentWillUnmount: ->

      _.each @_cables, ( cable, name )->

        @disconnectCable name

      , this


module.exports = mixin
