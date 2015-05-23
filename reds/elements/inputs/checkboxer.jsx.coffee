$require 'mixins/input'
$require 'mixins/component'

$define ->


  Checkboxer = React.createClass

    propTypes:

      onClick: React.PropTypes.func

    mixins: [ 'component', 'input' ]

    classes:
      'checkboxer':
        '-checked': ''

    onClick: ->

      _.pass @props.onClick

      @setValue 1 - Boolean @getValue()

      return

    onLabelClick: ->

      @onClick()

      return

    render: ->

      value = @getValue()

      className = @classes 'Checkboxer', '-checked': value

      `<div
        { ...this.omitProps() }
        className={ className }
        onClick={ this.onClick }
      />`
