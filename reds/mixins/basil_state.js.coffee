mixin =

  getInitialState: ->

    "#{ @basil_state.key }": @basil_state.default

  basilSet: ( key, value )->

    if arguments.length == 2

      value = _.merge {}, @basilGet(), "#{ key }": value

    else

      value = key

    @basil.set @basil_state.key, value

    @setState "#{ @basil_state.key }": value

    return

  basilGet: ->

    @basil.get( @basil_state.key ) || @state[ @basil_state.key ]

  componentWillMount: ->

    @basil = new window.Basil _.omit @basil_state, [ 'key', 'default' ]

    @basilSet @basilGet() if @basilGet()

    return


ReactMixinManager.add 'basil_state', mixin
