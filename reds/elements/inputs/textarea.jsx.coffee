$require 'mixins/input'
$require 'mixins/component'

$define ->


  Textarea = React.createClass

    propTypes:

      onBlur: React.PropTypes.func

    mixins: [ 'component', 'input' ]

    getDefaultProps: ->

      value: ''

    onChange: ( event )->

      @setTempValue event.target.value

      return

    onBlur: ( event )->

      _.pass @props.onBlur

      @setValue event.target.value

      return

    onLabelClick: ->

      React.findDOMNode( this ).focus()

      return

    render: ->

      value = @getValue()

      `<textarea
        { ...this.omitProps() }
        className={ this.classes( 'Textarea' ) }
        value={ value }
        onChange={ this.onChange }
        onBlur={ this.onBlur }
      />`
