mixin =

  getStateKey: ( key )->

    @state[ key ]

  setStateKey: ( key, value )->

    @setState "#{ key }": value

    return

  toggleStateKey: ( key )->

    @setState "#{ key }": ! @state[ key ]

    return


module.exports = mixin
