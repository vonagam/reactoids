classes = ->

  args = _.flattenDeep _.toArray arguments

  _.transform( args, ( result, arg )->

    if _.isObject arg

      arg = _.truthyKeys( arg ).join ' '

    if arg

      result.push arg

    return

  , [] ).join ' '


module.exports = classes
