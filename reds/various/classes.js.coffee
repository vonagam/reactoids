$define ->


  class Classes

    constructor: ->

      @classes = []

      return

    add: ->

      for arg in arguments

        switch typeof arg

          when 'string'

            @classes.push arg if arg

          when 'object'

            if arg instanceof Classes

              @classes.push arg.toString()

            else if arg instanceof Array

              @add.apply this, arg

            else

              for name, value of arg

                @classes.push name if value

      return this

    valueOf: ->

      @classes.join ' '

    toString: ->

      @valueOf()


  classes = ( args... )->

    result = new Classes

    result.add args

    result
