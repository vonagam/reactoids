mixin =

  toggleState: ( key, value )->

    @setState "#{ key }": if value != undefined then value else ! @state[ key ]

    return


React.mixins.add 'toggle_state', mixin
