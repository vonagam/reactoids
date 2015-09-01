mixin = ( ARGS )->

  # name
  # get
  # set

  ARGS = _.default {}, ARGS, name: 'store'


  stateKey = _.camelCase ARGS.name
  storeName = _.capitalize _.camelCase ARGS.name

  getStore = "get#{ storeName }"
  setStore = "set#{ storeName }"


  getInitialState: ->

    "#{ stateKey }": @[ getStore ]()

  "#{ getStore }": ->

    ARGS.get this

  "#{ getStore }Key": ( key )->

    @[ getStore ]()[ key ]

  "#{ setStore }": ( value )->

    return if _.isEqual @[ getStore ](), value

    ARGS.set this, value

    @setState "#{ stateKey }": @[ getStore ]()

    return

  "#{ setStore }Key": ( key, value )->

    currValue = @[ getStore ]()

    return if _.isEqual currValue[ key ], value

    nextValue = _.merge {}, currValue, "#{ key }": value

    @[ setStore ] nextValue

    return


module.exports = mixin
