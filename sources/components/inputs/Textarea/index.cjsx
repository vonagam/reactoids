Mixin = requireSource 'various/Mixin'
ComponentMixin = requireSource 'mixins/Component'
InputMixin = requireSource 'mixins/Input'


ComponentArgs = classes:
    
  '-value': ''
  '-readonly': ''


Textarea = React.createClass

  displayName: 'Textarea'

  mixins: Mixin.resolve [ ComponentMixin( ComponentArgs ), InputMixin ]

  propTypes:

    onBlur: React.PropTypes.func

  getDefaultProps: ->=

    defaultValue: ''

  onChange: ( event )->

    @setTempValue event.target.value

  onBlur: ( event )->

    @setValue event.target.value

  onLabelClick: ->

    @dom().focus()

  render: ->=

    { props, classed } = this

    value = @getValue()

    <textarea
      {... @omitProps() }
      className={ classed '.', '-value': value, '-readonly': props.readOnly }
      value={ value }
      onChange={ @onChange }
      onBlur={ _.queue @onBlur, props.onBlur }
    />


module.exports = Textarea
