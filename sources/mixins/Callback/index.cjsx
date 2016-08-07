mixin =

  Mixin.createPlain

    callback: ( keys )->=

      that = this


      @callback = _.memoize ( keys )->=

        keys = keys.split /\s*,\s*/

        ->

          for key in keys

            _.get( that, key, _.noop ).apply that, arguments

          ##

        ##

      ##


      @callback keys

    ##

  ##

##


module.exports = mixin
