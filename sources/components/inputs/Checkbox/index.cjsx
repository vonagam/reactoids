Mixin = requireSource 'various/Mixin'
ComponentMixin = requireSource 'mixins/Component'
InputMixin = requireSource 'mixins/Input'


ComponentArgs = classes:

  '-readonly': ''
  '-checked': ''


Checkbox = React.createClass

  displayName: 'Checkbox'

  mixins: Mixin.resolve [ ComponentMixin( ComponentArgs ), InputMixin ]

  onChange: ->

    @setValue ! Boolean @getValue()

  onLabelClick: ->

    @onChange()

  render: ->=

    { props, classed } = this

    value = @getValue()

    <input
      {... @omitProps() }
      type='checkbox'
      className={ classed '.', '-checked': value, '-readonly': props.readOnly }
      checked={ Boolean value }
      onChange={ @onChange }
    />


module.exports = Checkbox
