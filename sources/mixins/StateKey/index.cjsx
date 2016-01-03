mixin =

  Mixin.createPlain

    getStateKey: ( key )->=

      @state[ key ]

    setStateKey: ( key, value, callback )->

      @setState "#{ key }": value, callback

    toggleStateKey: ( key, callback )->

      @setState "#{ key }": ! @state[ key ], callback


module.exports = mixin
