classes = ->=

  args = _.flattenDeep arguments

  _.transform( args, ( result, arg )->

    if _.isObject arg

      arg = _.truthyKeys( arg ).join ' '

    ##

    if arg

      result.push arg

    ##

  , [] ).join ' '

##


module.exports = classes
