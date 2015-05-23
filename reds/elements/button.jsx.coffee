Sender = $require 'elements/sender'
$require 'mixins/component'

$define ->


  Button = React.createClass

    propTypes:

      onClick: React.PropTypes.func
      text: React.PropTypes.node

    mixins: [ 'component' ]

    classes:
      'button':
        '-disabled': ''
        '-enabled': ''

    onClick: ->

      _.pass @props.onClick, arguments

      @refs.sender.send() if @props.ajax

      return

    render: ->

      if @props.ajax

        Tag = Sender
        
      else if @props.href

        Tag = 'a'

      else

        Tag = 'div'

        disabled = true unless @props.onClick

      `<Tag
        ref='sender'
        { ...this.omitProps() }
        className={ this.classes( 'Button', disabled ? '-disabled' : '-enabled' ) }
        onClick={ this.onClick }
      >
        { this.props.text || this.props.children }
      </Tag>`
