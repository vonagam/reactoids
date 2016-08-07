classes = ->=

  args = _.flattenDeep arguments


  _.reduce args, ( result, arg )->=

    arg = _.truthyKeys( arg ).join ' ' if _.isObject arg


    return result unless arg

    return arg unless result

    return result + ' ' + arg

  , ''

##


module.exports = classes
