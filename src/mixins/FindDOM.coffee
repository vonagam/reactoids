findDOM = require '../various/findDOM'


mixin =

  findDOM: ( ref )->

    return findDOM this unless ref

    return findDOM @refs[ ref ] if _.isString ref

    return findDOM ref


module.exports = mixin
