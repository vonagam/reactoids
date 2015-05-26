$require 'mixins/input'
$require 'mixins/component'

$define ->


  Checkbox = React.createClass

    mixins: [ 'component', 'input' ]

    classes:
      'checkbox':
        '-checked': ''

    onChange: ->

      @setValue ! Boolean @getValue()

      return

    onLabelClick: ->

      @onChange()

      return

    render: ->

      value = @getValue()

      className = @classed '', '-checked': value

      `<input
        { ...this.omitProps() }
        type='checkbox'
        className={ className }
        checked={ Boolean( value ) }
        onChange={ this.onChange }
      />`
