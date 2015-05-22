mixin =

  toggleState: ( key, value )->

    @setState "#{ key }": if value != undefined then value else ! @state[ key ]

    return


ReactMixinManager.add 'toggle_state', mixin
