queue = ( _ )->=

  ->=

    funcs = _.filter arguments, _.isFunction

    ->

      for func in funcs

        func.apply this, arguments


module.exports = queue
