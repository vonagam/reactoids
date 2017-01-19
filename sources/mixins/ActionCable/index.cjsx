# dependencies

ActionCable = requireDependency 'actioncable' # rails/rails/tree/master/actioncable, rhyzx/actioncable

# TODO use something like crosstab to use only 1 connection between multiply tabs


ActionCableMixin = Mixin.create {

  name: 'ActionCableMixin'

  args: {

    'url': React.PropTypes.funced React.PropTypes.string # ( that )->= action cable endpoint

    'timeout': React.PropTypes.funced React.PropTypes.number # ( that )->= timeout for closing a connection

  }

  defaults: {

    'url': '/cable'

    'timeout': 1000

  }

  mixin: ( ARGS )->=

    consumer = undefined

    count = 0

    timeoutId = undefined

    openConnection = ( that )->

      count += 1

      return unless count == 1

      consumer ||= ActionCable.createConsumer _.funced ARGS.url, that

      consumer.connection.open() if consumer.connection.isState 'closed'

    ##

    closeConnection = ( that )->

      count -= 1

      return unless count == 0

      clearTimeout timeoutId

      timeoutId = setTimeout ->

        consumer.connection.close() unless consumer.connection.isState 'closed'

      , _.funced ARGS.timeout, that

    ##


    getInitialMembers: ->=

      '_cables': {}

    ##

    componentWillUnmount: ->

      _.each @_cables, _.bind ( cable, name )->

        @disconnectCable name

      , this

    ##

    connectCable: ( name, channel, mixin )->

      if arguments.length == 2

        mixin = channel

        channel = name

        name = if _.isString channel then channel else channel.channel

      ##

      if mixin

        mixin = _.mapValues mixin, _.bind ( ( value )->= _.bind value, this ), this

      ##

      throw new Error "ActionCableMixin: cable with name '#{ name }' is already connected" if @hasCable name

      openConnection this

      @_cables[ name ] = consumer.subscriptions.create channel, mixin

    ##

    disconnectCable: ( name )->

      throw new Error "ActionCableMixin: cable with name '#{ name }' is already disconnected" unless @hasCable name

      @_cables[ name ].unsubscribe()

      delete @_cables[ name ]

      closeConnection this

    ##

    hasCable: ( name )->=

      Boolean @_cables[ name ]

    ##

    sendCable: ( name, data )->

      @_cables[ name ].send data

    ##

    performCable: ( name, action, data )->

      @_cables[ name ].perform action, data

    ##

  ##

}


module.exports = ActionCableMixin
