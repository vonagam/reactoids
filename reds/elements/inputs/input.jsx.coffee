$require 'mixins/input'
$require 'mixins/component'

$define ->


  Input = React.createClass

    mixins: [ 'component', 'input' ]

    propTypes:

      sub_type: React.PropTypes.string
      onBlur: React.PropTypes.func
      onKeyDown: React.PropTypes.func
      onSubmit: React.PropTypes.func

    classes:
      'input': ''

    getDefaultProps: ->

      sub_type: 'text'
      value: ''

    onChange: ( event )->

      @setTempValue event.target.value

      return

    onBlur: ( event )->

      _.pass @props.onBlur

      @setValue event.target.value

      return

    onKeyDown: ( event )->

      _.pass @props.onKeyDown, arguments

      if event.key == 'Enter'

        event.target.blur()

        _.pass @props.onSubmit

      return

    onLabelClick: ->

      React.findDOMNode( this ).focus()

      return

    render: ->

      value = @getValue()

      `<input
        { ...this.omitProps() }
        className={ this.classed( '' ) }
        value={ value }
        type={ this.props.sub_type }
        onChange={ this.onChange }
        onBlur={ this.onBlur }
        onKeyDown={ this.onKeyDown }
      />`
