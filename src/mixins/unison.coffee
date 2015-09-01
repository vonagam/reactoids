mixin = ( ARGS )->

  # method
  # duration
  # name
  # auto


  Unison =

    method: ARGS.method

    duration: ARGS.duration

    elements: []

    interval: undefined

    invoke: ->

      _.invoke Unison.elements, Unison.method

      return

    toggle: ( element, bool )->

      elements = Unison.elements

      return if bool == _.include elements, element

      if bool

        elements.push element

      else

        _.pull elements, element

      if elements.length > 0

        Unison.interval ||= setInterval Unison.invoke, Unison.duration

      else

        clearInterval Unison.interval

        Unison.interval = undefined

      return


  member = "in#{ _.capitalize ARGS.name }Unison"
  
  method = "toggle#{ _.capitalize ARGS.name }Unison"


  getInitialMembers: ->

    "#{ member }": false

  "#{ method }": ( bool )->

    return if @[ member ] == Boolean bool

    @[ member ] = Boolean bool

    Unison.toggle this, bool

    return

  componentDidMount: ->

    @[ method ] true if ARGS.auto

    return

  componentWillUnmount: ->

    @[ method ] false
    
    return


module.exports = mixin
