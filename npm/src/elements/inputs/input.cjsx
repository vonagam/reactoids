§require 'mixins/component'
§require 'mixins/input'


Input = React.createClass

  displayName: 'Input'

  mixins: [ 'component', 'input' ]

  classes:

    'input':
      '-readonly': ''

  propTypes:

    type: React.PropTypes.string
    onBlur: React.PropTypes.func
    onKeyDown: React.PropTypes.func
    onSubmit: React.PropTypes.func

  getDefaultProps: ->

    type: 'text'
    default_value: ''

  onChange: ->

    @setTempValue @dom().value

    return

  onBlur: ->

    @setValue @dom().value

    return

  onKeyDown: ->

    if event.key == 'Enter'

      @dom().blur()

      @props.onSubmit?()

    return

  onLabelClick: ->

    @dom().focus()

    return

  render: ->

    <input
      {... @omitProps() }
      className={ @classed '', '-readonly': @props.readonly }
      value={ @getValue() }
      type={ @props.type }
      onChange={ @onChange }
      onBlur={ @_queue @props.onBlur, @onBlur }
      onKeyDown={ @_queue @props.onKeyDown, @onKeyDown }
    />


§export Input
