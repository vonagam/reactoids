§global 'Basil', 'http://wisembly.github.io/basil.js'


mixin =

  # must implement
  #
  # basil:
  #   namespace: string
  #   expireDays: number
  #   key: string
  #   default: object

  basilSet: ->

    if arguments.length == 2

      value = _.merge {}, @basilGet(), "#{ arguments[ 0 ] }": arguments[ 1 ]

    else

      value = arguments[ 0 ]

    @_basil.set @basil.key, value

    @setState "#{ @basil.key }": value

    return

  basilGet: ->

    @_basil.get @basil.key

  componentWillMount: ->

    @_basil = new Basil _.omit @basil, [ 'key', 'default' ]

    basil_value = @basilGet()

    if basil_value

      @setState "#{ @basil.key }": basil_value

    else if @basil.default

      @basilSet @basil.default

    return


ReactMixinManager.add 'basil', mixin
