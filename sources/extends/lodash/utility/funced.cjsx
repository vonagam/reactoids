funced = ( value )->=

  if _.isFunction value

    args = _.slice arguments, 1 if arguments.length > 1

    value.apply undefined, args

  else

    value

  ##

##


module.exports = funced
