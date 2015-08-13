React.PropTypes.funced = ->

  types = Array.prototype.slice.call arguments

  types = [ React.PropTypes.func ].concat types

  React.PropTypes.oneOfType types


React.PropTypes.collection = React.PropTypes.oneOfType [ React.PropTypes.object, React.PropTypes.array ]
