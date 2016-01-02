Mixin = requireSource 'various/Mixin'
ComponentMixin = requireSource 'mixins/Component'
InputMixin = requireSource 'mixins/Input'


ComponentArgs = classes:

  '-readonly': ''
  '-checked': ''


Checkboxer = React.createClass

  displayName: 'Checkboxer'

  mixins: Mixin.resolve [ ComponentMixin( ComponentArgs ), InputMixin ]

  propTypes:

    onClick: React.PropTypes.func

  onClick: ->

    @setValue ! Boolean @getValue()

  onLabelClick: ->
    
    @onClick()

  render: ->=

    { props, classed } = this
    
    <div
      {... @omitProps() }
      className={ classed '.', '-checked': @getValue(), '-readonly': props.readOnly }
      onClick={ _.queue @onClick, props.onClick }
    />


module.exports = Checkboxer
