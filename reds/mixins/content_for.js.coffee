mixin =

  componentWillMount: ->

    @__content_for = {}

    return

   componentWillUpdate: ->

    @__content_for = {}

    return

  contentFor: ( key, value )->

    current_value = @__content_for[ key ]

    return current_value if arguments.length == 1

    return unless value

    if ! current_value

      @__content_for[ key ] = value

    else if _.isArray current_value

      @__content_for[ key ] = current_value.concat value

    else

      @__content_for[ key ] = [ current_value, value ]

    return


ReactMixinManager.add 'content_for', mixin
