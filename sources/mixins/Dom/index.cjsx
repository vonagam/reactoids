DomMixin = Mixin.create {

  name: 'DomMixin'

  mixin: _.once ->=

    dom: ( ref )->=

      return ReactDOM.findDOMNode this unless ref

      return ReactDOM.findDOMNode @refs[ ref ] if _.isString ref

      return ReactDOM.findDOMNode ref

    ##

  ##

}


module.exports = DomMixin
