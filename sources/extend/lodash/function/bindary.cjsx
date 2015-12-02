bindary = ( _ )->=

  ->=

    arguments[ 0 ] = _.ary arguments[ 0 ], arguments.length - 2

    _.bind.apply _, arguments


module.exports = bindary
