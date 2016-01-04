createObtainer = ( that )->=

  _.memoize ( key )->=

    ->=

      _.get( that, key ).apply that, arguments

    ##

  ##

##


mixin = 

  Mixin.createPlain

    callback: ( key )->=

      obtainCallback = createObtainer this

      @callback = ( key )->=

        value = _.get this, key

        if _.isFunction value

          return obtainCallback key

        else

          return value

        ##

      ##

      @callback key

    ##

  ##

##


module.exports = mixin
