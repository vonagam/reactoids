Mixin = requireSource 'various/Mixin'


createObtainer = ( that )->=

  _.memoize ( key )->=

    ->=

      _.get( that, key ).apply that, arguments


mixin = 

  Mixin.createPlain

    getInitialMembers: ->=

      _obtainCallback: undefined

    callback: ( key )->=

      value = _.get this, key

      if _.isFunction value

        @_obtainCallback ||= createObtainer this

        return @_obtainCallback key

      else

        return value


module.exports = mixin
