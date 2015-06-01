mixin =

  getDOM: ( ref )->

    React.findDOMNode if ref then @refs[ ref ] else this


ReactMixinManager.add 'get_dom', mixin
