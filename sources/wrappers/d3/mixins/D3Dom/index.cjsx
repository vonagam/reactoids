Mixin = requireSource 'various/Mixin'

DomMixin = requireSource 'mixins/Dom'


mixin =

  Mixin.createPlain

    mixins: [ DomMixin ]

    d3dom: ( ref )->=

      d3.select @dom ref


module.exports = mixin
