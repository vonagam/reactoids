BaseKeyMixin = Mixin.create {

  name: 'BaseKeyMixin'

  args: {

    'name': React.PropTypes.string

    'get': React.PropTypes.func # ( that, props, state )->=

    'set': React.PropTypes.func # ( that, value, callback )->

  }

  mixin: ( ARGS )->=

    method = _.pascalCase "#{ ARGS.name }Key"

    member = '_' + _.pascalCase "#{ ARGS.name }KeyMixin"


    getMethod = "get#{ method }"

    updateMethod = "update#{ method }"


    getValue = ( that )->=

      that[ member ]

    ##

    setValue = ( that, value, callback )->

      that[ member ] = value

      ARGS.set that, value, callback

    ##

    getKey = ( value, key, defaultValue )->=

      if _.isEmpty key

        result = value || defaultValue

      else

        result = _.get value, key, defaultValue

      ##

      result

    ##

    updateKey = ( value, key, updater )->=

      if _.isEmpty key

        value = updater value

      else

        _.updateWith value, key, updater, ( object )->=

          if object then _.clone( object ) else undefined

        ##

      ##

      value

    ##


    getInitialMembers: ->=

      "#{ member }": ARGS.get this, @props, @state

    ##

    componentDidMount: ->

      @[ member ] = ARGS.get this, @props, @state

    ##

    componentWillUpdate: ( nextProps, nextState )->

      @[ member ] = ARGS.get this, nextProps, nextState

    ##

    componentDidUpdate: ->

      @[ member ] = ARGS.get this, @props, @state

    ##

    "get#{ method }": ( key, defaultValue )->=

      value = getValue this

      result = getKey value, key, defaultValue

      result

    ##

    "get#{ method }s": ( keys, defaultValue )->=

      value = getValue this

      result = _.transform keys, ( result, key )->

        result[ key ] = getKey value, key, defaultValue

      , {}

      result

    ##

    "update#{ method }": ( key, updater, callback )->

      value = _.clone getValue this

      value = updateKey value, key, updater

      setValue this, value, callback

    ##

    "update#{ method }s": ( updaters, callback )->

      value = _.clone getValue this

      _.each updaters, ( updater, key )->

        value = updateKey value, key, updater

      ##

      setValue this, value, callback

    ##

    "set#{ method }": ( key, value, callback )->

      @[ "update#{ method }" ] key, _.constant( value ), callback

    ##

    "set#{ method }s": ( values, callback )->

      updaters = _.mapValues values, ( value )->= _.constant value

      @[ "update#{ method }s" ] updaters, callback

    ##

    "toggle#{ method }": ( key, callback )->

      @[ "update#{ method }" ] key, _.negate( _.identity ), callback

    ##

    "toggle#{ method }s": ( keys, callback )->

      updaters = _.transform keys, ( ( updaters, key )-> updaters[ key ] = _.negate _.identity ), {}

      @[ "update#{ method }s" ] updaters, callback

    ##

    "add#{ method }": ( key, delta, callback )->

      @[ "update#{ method }" ] key, ( ( value )->= ( value || 0 ) + delta ), callback

    ##

    "add#{ method }s": ( deltas, callback )->

      updaters = _.mapValues deltas, ( delta )->= ( ( value )->= ( value || 0 ) + delta )

      @[ "update#{ method }s" ] updaters, callback

    ##

    "unset#{ method }": ( key, callback )->

      path = _.toPath key

      objectPath = _.dropRight path

      objectKey = _.last path

      @[ "update#{ method }" ] objectPath, ( ( value )->= _.omit value, objectKey ), callback

    ##

    "unset#{ method }s": ( keys, callback )->

      updaters = _.transform keys, ( updaters, key )->

        path = _.toPath key

        objectPath = _.dropRight path

        objectKey = _.last path

        updaters[ key ] = ( value )->= _.omit value, objectKey

      , {}

      @[ "update#{ method }s" ] updaters, callback

    ##

  ##

}


module.exports = BaseKeyMixin
