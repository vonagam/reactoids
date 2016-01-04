findDOM = requireSource 'various/findDOM'


mixin =

  Mixin.createPlain

    dom: ( ref )->=

      return findDOM this unless ref

      return findDOM @refs[ ref ] if _.isString ref

      return findDOM ref

    ##

  ##

##


module.exports = mixin
