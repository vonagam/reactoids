classes = $require 'various/classes'
simulateLink = $require 'various/simulate_link'
$require 'mixins/ajax_sender'
$require 'mixins/component'

$define ->


  Sender = React.createClass

    propTypes:

      ajax: React.PropTypes.funced React.PropTypes.object
      redirect: React.PropTypes.funced [ React.PropTypes.string, React.PropTypes.bool ]

    mixins: [ 'component', 'ajax_sender' ]

    classes:
      'sender':
        '-waiting': ''
        '-ready': ''

    getDefaultProps: ->

      redirect: ( data, status, xhr )-> xhr.getResponseHeader 'Location'

    onSendSuccess: ( data, status, xhr )->

      location = _.funced @props.redirect, data, status, xhr

      return unless location

      simulateLink location, React.findDOMNode( this ), ( $link )-> $link.data( 'no-cache', true )

      return

    send: ->

      return if @ajax_requests.sended

      ajax = _.funced @props.ajax 
      
      return unless ajax

      ajax.method ||= 'get'

      ajax.dataType ||= 'json'

      ajax.method = ajax.method.toUpperCase()

      ajax.url = Routes[ ajax.url ]() if /^\w+$/.test ajax.url

      ajax.success = _.queue @onSendSuccess, ajax.success

      @sendAjax 'sended', ajax

      return

    render: ->

      className = @classed '',
        '.-waiting': @state.ajax_requests.sended
        '.-ready': @props.ajax

      `<div
        { ...this.omitProps() }
        className={ className }
      />`

      
