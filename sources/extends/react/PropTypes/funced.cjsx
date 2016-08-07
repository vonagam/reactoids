PropTypes = React.PropTypes


PropTypes.funced = ( types )->=

  types = Array.prototype.slice.call arguments

  types = [ PropTypes.func ].concat types

  PropTypes.oneOfType types

##
