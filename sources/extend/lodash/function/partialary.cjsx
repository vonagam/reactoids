partialary = ( _ )->=

  ->=

    arguments[ 0 ] = _.ary arguments[ 0 ], arguments.length - 1

    _.partial.apply _, arguments

  ##

##


module.exports = partialary
