$require 'mixins/input'
$require 'mixins/component'

$define ->


  Checkboxer = React.createClass

    mixins: [ 'component', 'input' ]

    propTypes:

      onClick: React.PropTypes.func

    classes:
      'checkboxer':
        '-checked': ''

    onClick: ->

      _.pass @props.onClick

      @setValue ! Boolean @getValue()

      return

    onLabelClick: ->

      @onClick()

      return

    render: ->

      value = @getValue()

      className = @classed '', '-checked': value

      `<div
        { ...this.omitProps() }
        className={ className }
        onClick={ this.onClick }
      />`
