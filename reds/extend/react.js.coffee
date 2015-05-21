React.PropTypes.funced = ->

  types = Array.prototype.slice.call arguments

  types = [ React.PropTypes.func ].concat types

  React.PropTypes.oneOfType types
