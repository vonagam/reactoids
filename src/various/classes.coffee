processClasses = ( args )->

  result = []

  _.each args, ( arg )->

    item =

      if _.isString arg

        arg

      else if _.isArray arg

        processClasses arg

      else if _.isObject arg

        _.truthyKeys( arg ).join ' '

      else

        arg

    result.push item if item

    return

  result.join ' '


classes = -> processClasses _.toArray arguments


§export classes
