mixin =

  Mixin.createPlain {

    dom: ( ref )->=

      return ReactDOM.findDOMNode this unless ref

      return ReactDOM.findDOMNode @refs[ ref ] if _.isString ref

      return ReactDOM.findDOMNode ref

    ##

  }

##


module.exports = mixin
