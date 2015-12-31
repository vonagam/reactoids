Mixin = requireSource 'various/Mixin'


FUNC_MEMBERS = [

  'componentDidMount'
  'componentDidUpdate'
  'componentWillMount'
  'componentWillReceiveProps'
  'componentWillUnmount'
  'componentWillUpdate'
  'shouldComponentUpdate'
  'getChildContext'

]

TYPES_MEMBERS = [

  'contextTypes'
  'childContextTypes'
  'propTypes'

]

SPECIAL_MEMBERS = [

  'mixins'
  'statics'
  'getDefaultProps'
  'getInitialState'
  'displayName'

]

MEMBERS = _.union FUNC_MEMBERS, TYPES_MEMBERS, SPECIAL_MEMBERS



getMergedFunceds = ( values, context )->=

  _.transform values, ( result, value )->

    value = value.apply context if _.isFunction value

    # TODO add error if overlaping

    _.assign result, value

  , {}


mergeStatics = ( mixins, Component )->

  _.each mixins, ( mixin )->

    _.each mixin.statics, ( value, key )->

      if Component.hasOwnProperty key

        console.error 'static member "%s" already defined in "%s"', key, Component.displayName

        return

      Component[ key ] = value


mergeTypesMembers = ( mixins, Component )->

  _.each TYPES_MEMBERS, ( member )->

    Component[ member ] = 

      _.transform mixins, ( result, mixin )->

        _.each mixin[ member ], ( value, key )->

          if result.hasOwnProperty key

            console.error 'conflict in "%s" for type of "%s" in "%s"', member, key, Component.displayName

            return

          result[ key ] = value

      , {}


mergeDefaultProps = ( mixins, Component )->

  Component.defaultProps = getMergedFunceds _.map mixins, 'getDefaultProps'


transferCustomMembers = ( mixins, Component )->

  proto = Component.prototype

  _.each mixins, ( mixin )->

    _.each mixin, ( value, key )->

      return if _.include MEMBERS, key

      if proto.hasOwnProperty key

        console.error 'multiply mixins implement "%s" in "%s"', key, Component.displayName

        return

      proto[ key ] = value


mergeFuncMembers = ( mixins, Component )->

  proto = Component.prototype

  _.each FUNC_MEMBERS, ( key )->

    funcs = _.filter _.map( mixins, key ), _.isFunction

    return if funcs.length == 0

    proto[ key ] = funcs[ 0 ] if funcs.length == 1

    proto[ key ] = 

      if key == 'shouldComponentUpdate'

        ->=

          for func in funcs

            return true if true == func.apply this, arguments

          return false

      else

        ->

          for func in funcs

            func.apply this, arguments


createComponent = ( scheme )->=

  mixins = Mixin.resolve scheme.mixins

  getInitialStates = _.compact _.map mixins, 'getInitialState'

  Component = ( element )->

    @_currentElement = element
    @_mountImage = null # is it needed??? i mean name. can't find it used in react.
    @_renderedChildren = null

    @pixi = undefined # freezed

    @state = getMergedFunceds getInitialStates, this

  Component.displayName = scheme.displayName

  prototype = Component.prototype

  prototype.mixins = mixins

  prototype.construct = _.noop # unnecessary but required by React method

  mergeTypesMembers mixins, Component

  mergeDefaultProps mixins, Component
  
  mergeStatics mixins, Component

  mergeFuncMembers mixins, Component

  transferCustomMembers mixins, Component

  Component


module.exports = createComponent
