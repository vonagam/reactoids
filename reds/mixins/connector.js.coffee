mixin =

  connect: ( ref, signal, args )->

    that = this

    ->

      if args

        if args == true

          argus = arguments

        else

          argus = args

      that.refs[ ref ][ signal ].apply undefined, argus


ReactMixinManager.add 'connector', mixin
