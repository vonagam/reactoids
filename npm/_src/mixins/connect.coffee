mixin =

  connect: ( ref, signal, arguments_policy )->

    that = this

    ->

      passed_arguments =

        if _.isBoolean arguments_policy

          if arguments_policy == true then arguments else undefined

        else if _.isArray arguments_policy

          arguments_policy

        else if _.isNumber arguments_policy

          _.slice arguments, 0, arguments_policy

      receiver = that[ refs ][ ref ]

      receiver[ signal ].apply receiver, passed_arguments


ReactMixinManager.add 'connect', mixin
