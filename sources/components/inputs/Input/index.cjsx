Mixin = requireSource 'various/Mixin'
ComponentMixin = requireSource 'mixins/Component'
InputMixin = requireSource 'mixins/Input'


ComponentArgs = classes:

  '-value': ''
  '-readonly': ''


Input = React.createClass

  displayName: 'Input'

  mixins: Mixin.resolve [ ComponentMixin( ComponentArgs ), InputMixin ]

  propTypes:

    type: React.PropTypes.string
    onBlur: React.PropTypes.func
    onKeyDown: React.PropTypes.func
    onSubmit: React.PropTypes.func

  getDefaultProps: ->=

    type: 'text'
    defaultValue: ''

  onChange: ( event )->

    @setTempValue event.target.value

  onBlur: ( event )->

    @setValue event.target.value

  onKeyDown: ( event )->

    if event.key == 'Enter'

      event.target.blur()

      _.funced @props.onSubmit

  onLabelClick: ->

    @dom().focus()

  render: ->=

    { props, classed } = this

    value = @getValue()

    <input
      {... @omitProps() }
      className={ classed '.', '-value': value, '-readonly': props.readOnly }
      value={ value }
      type={ props.type }
      onChange={ @onChange }
      onBlur={ _.queue @onBlur, props.onBlur }
      onKeyDown={ _.queue @onKeyDown, props.onKeyDown }
    />


module.exports = Input
