mixin =

  dom: ( ref )->

    return React.findDOMNode this unless ref

    return React.findDOMNode @refs[ ref ] if typeof ref == 'string'

    return React.findDOMNode ref


ReactMixinManager.add 'dom', mixin
