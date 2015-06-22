# Routes = $global 'Routes' http://railsware.github.io/js-routes

$require 'mixins/ajax'

simulateLink = $require 'various/simulate_link'


mixin =

  # may implement
  #
  # getAjax: -> object

  propTypes:

    ajax: React.PropTypes.funced React.PropTypes.object
    redirect: React.PropTypes.funced React.PropTypes.string, React.PropTypes.bool

  getDefaultProps: ->

    redirect: ( data, status, xhr )-> xhr.getResponseHeader 'Location'

  onSendSuccess: ( data, status, xhr )->

    location = _.funced @props.redirect, data, status, xhr

    return unless location

    simulateLink location, React.findDOMNode( this ), ( $link )-> $link.data 'no-cache', true

    return

  send: ->

    return if @ajax_requests.sended

    ajax = @getAjax?() || _.funced @props.ajax 
    
    return unless ajax

    ajax.method = ( ajax.method || 'get' ).toUpperCase()

    ajax.url = Routes[ ajax.url ]() if /^\w+$/.test ajax.url

    ajax.success = _.queue @onSendSuccess, ajax.success

    @sendAjax 'sended', ajax

    return


ReactMixinManager.add 'ajax_sender', mixin, 'ajax'
