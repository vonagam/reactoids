findDOM = §require 'various/find_dom'


mixin =

  dom: ( ref )->

    return findDOM this unless ref

    return findDOM @refs[ ref ] if typeof ref == 'string'

    return findDOM ref


ReactMixinManager.add 'dom', mixin
