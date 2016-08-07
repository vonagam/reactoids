mixin = Mixin.createArged

  args:

    'name': React.PropTypes.string

    'get': React.PropTypes.func # ( that )->= value

    'set': React.PropTypes.func # ( that, value )->

  ##

  defaults:

    'name': 'store'

  ##

  mixin: ( ARGS )->=

    stateKey = _.camelCase ARGS.name
    storeName = _.pascalCase ARGS.name

    getStore = "get#{ storeName }"
    setStore = "set#{ storeName }"
    syncStore = "sync#{ storeName }"


    getInitialState: ->=

      "#{ stateKey }": @[ getStore ]()

    ##

    "#{ getStore }": ->=

      ARGS.get this

    ##

    "#{ getStore }Key": ( key )->=

      @[ getStore ]()[ key ]

    ##

    "#{ syncStore }": ->

      @setState "#{ stateKey }": @[ getStore ]()

    ##

    "#{ setStore }": ( value )->

      return if _.isEqual @[ getStore ](), value

      ARGS.set this, value

      @[ syncStore ]()

    ##

    "#{ setStore }Key": ( key, value )->

      currValue = @[ getStore ]()

      return if _.isEqual currValue[ key ], value

      nextValue = _.clone currValue

      nextValue[ key ] = value

      @[ setStore ] nextValue

    ##

  ##

##


module.exports = mixin
