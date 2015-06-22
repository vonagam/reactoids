$require 'mixins/component'
$require 'mixins/input'


Textarea = React.createClass

  displayName: 'Textarea'

  mixins: [ 'component', 'input' ]

  classes:
    
    'textarea':
      '-readonly': ''

  propTypes:

    onBlur: React.PropTypes.func

  getDefaultProps: ->

    default_value: ''

  onChange: ( event )->

    @setTempValue event.target.value

    return

  onBlur: ( event )->

    @setValue event.target.value

    return

  onLabelClick: ->

    @dom().focus()

    return

  render: ->

    <textarea
      {... @omitProps() }
      className={ @classed '', '-readonly': @props.readonly }
      value={ @getValue() }
      onChange={ @onChange }
      onBlur={ @_queue @props.onBlur, @onBlur }
    />


$define -> Textarea
