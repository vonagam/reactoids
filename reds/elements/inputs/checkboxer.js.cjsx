$require 'mixins/component'
$require 'mixins/input'


Checkboxer = React.createClass

  displayName: 'Checkboxer'

  mixins: [ 'component', 'input' ]

  classes:

    'checkboxer':
      '-readonly': ''
      '-checked': ''

  propTypes:

    onClick: React.PropTypes.func

  onClick: ->

    @setValue ! Boolean @getValue()

    return

  onLabelClick: ->

    @onClick()

    return

  render: ->
    
    <div
      {... @omitProps() }
      className={ @classed '', '-checked': @getValue(), '-readonly': @props.readonly }
      onClick={ @_queue @props.onClick, @onClick }
    />


$define -> Checkboxer
