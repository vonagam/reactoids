mixin = ( method, duration, name = '' )->

  Unison =

    elements: []

    interval: undefined

    duration: duration

    method: method

    invoke: ->

      _.invoke Unison.elements, Unison.method

      return

    toggle: ( element, bool )->

      elements = Unison.elements

      return if bool == _.include elements, element

      if bool

        elements.push element

      else

        _.remove elements, ( _element )-> element == _element

      if elements.length > 0

        Unison.interval ||= setInterval Unison.invoke, Unison.duration

      else

        clearInterval Unison.interval

        Unison.interval = undefined

      return


  member_name = '_' + _.snakeCase "In#{ _.capitalize name }Unison"
  method_name = "toggle#{ _.capitalize name }Unison"


  "#{ method_name }": ( bool )->

    return if Boolean( @[ member_name ] ) == bool

    @[ member_name ] = bool

    Unison.toggle this, bool

    return

  componentWillUnmount: ->

    @[ method_name ] false
    
    return


ReactMixinManager.add 'unison', mixin
