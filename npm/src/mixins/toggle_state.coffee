mixin =

  toggleState: ( key, value )->

    @setState "#{ key }": if arguments.length == 2 then value else ! @state[ key ]

    return


ReactMixinManager.add 'toggle_state', mixin
