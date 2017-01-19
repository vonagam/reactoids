CallbackMixin = Mixin.create {

  name: 'CallbackMixin'

  mixin: _.once ->=

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

}


module.exports = CallbackMixin
