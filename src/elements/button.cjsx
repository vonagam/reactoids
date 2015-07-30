§require 'mixins/component'
§require 'mixins/ajax_sender'


Button = React.createClass

  displayName: 'Button'

  mixins: [ 'component', 'ajax_sender' ]

  classes:

    'button':
      '-enabled': ''
      '-disabled': ''
      '-waiting': ''

  propTypes:

    onClick: React.PropTypes.func
    text: React.PropTypes.node

  onClick: ->

    @send() if @props.ajax

    return

  render: ->

    Tag = if @props.href then 'a' else 'span'

    enabled = @props.href || @props.onClick || @props.ajax

    <Tag
      {... @omitProps() }
      className={ @classed '', "-#{ if enabled then 'enabled' else 'disabled' }", '-waiting': @state.ajax_requests.sended }
      onClick={ @_queue @props.onClick, @onClick }
    >
      { 

        @props.text || @props.children

      }
    </Tag>


§export Button
