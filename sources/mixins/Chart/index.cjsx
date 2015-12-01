Mixin = requireSource 'various/Mixin'


mixin =

  Mixin.createPlain

    propTypes:

      width: React.PropTypes.number.isRequired
      height: React.PropTypes.number.isRequired
      values: React.PropTypes.array
      colors: React.PropTypes.array
      labels: React.PropTypes.array

    getDefaultProps: ->

      values: []
      colors: []
      labels: []


module.exports = mixin
