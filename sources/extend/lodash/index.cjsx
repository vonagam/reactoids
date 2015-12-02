mixin = require './mixin'


extend = ( _ )->

  source = _.mapValues mixin, ( value )->= value( _ )

  _.mixin source


module.exports = extend
