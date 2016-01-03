mixin = Mixin.createArged

  args:

    name: React.PropTypes.string
    update: React.PropTypes.func # ( element )->
    duration: React.PropTypes.number
    shouldUnison: React.PropTypes.funced React.PropTypes.bool # ( that )->=
    shouldSkip: React.PropTypes.funced React.PropTypes.bool # ()->=

  defaults:

    name: ''
    shouldUnison: false
    shouldSkip: false

  mixin: ( ARGS )->=

    Unison =

      insideUpdate: false

      changeInside: false

      elements: []

      updateElements: ->

        return if _.funced ARGS.shouldSkip

        @insideUpdate = true

        _.each @elements, ( element )->

          ARGS.update element if element

        @insideUpdate = false

        if @changeInside

          @elements = _.filter @elements

          @checkRunning()

          @changeInside = false

      checkRunning: ->

        if @elements.length > 0

          @interval ||= setInterval _.bind( @updateElements, this ), ARGS.duration

        else

          clearInterval @interval

          @interval = undefined

      toggleElement: ( element, bool )->

        index = _.indexOf @elements, element

        return if bool == ( index != -1 )

        if bool

          @elements.push element

          @checkRunning()

        else

          if @insideUpdate == false

            @elements.splice index, 1

            @checkRunning()

          else

            @elements[ index ] = undefined

            @changeInside = true


    member = "in#{ _.capitalize ARGS.name }Unison"
    
    method = "toggle#{ _.capitalize ARGS.name }Unison"


    getInitialMembers: ->=

      "#{ member }": false

    "#{ method }": ( bool )->

      return if @[ member ] == Boolean bool

      @[ member ] = Boolean bool

      Unison.toggleElement this, bool

    componentDidMount: ->

      @[ method ] _.funced ARGS.shouldUnison, this

    componentDidUpdate: ->

      @[ method ] _.funced ARGS.shouldUnison, this

    componentWillUnmount: ->

      @[ method ] false


module.exports = mixin
