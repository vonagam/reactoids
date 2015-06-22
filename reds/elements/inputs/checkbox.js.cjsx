$require 'mixins/component'
$require 'mixins/input'


Checkbox = React.createClass

  displayName: 'Checkbox'

  mixins: [ 'component', 'input' ]

  classes:

    'checkbox':
      '-readonly': ''
      '-checked': ''

  onChange: ->

    @setValue ! Boolean @getValue()

    return

  onLabelClick: ->

    @onChange()

    return

  render: ->

    value = @getValue()

    <input
      {... @omitProps() }
      type='checkbox'
      className={ @classed '', '-checked': value, '-readonly': @props.readonly }
      checked={ Boolean value }
      onChange={ @onChange }
    />


$define -> Checkbox
