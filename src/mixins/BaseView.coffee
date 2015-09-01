#§global '$', 'http://jquery.com'

findDOM = require '../various/findDOM'


mixin = ( ARGS )->

  # handleLink ( that, link, inDomain )->


  componentDidMount: ->

    $( findDOM this ).on 'click', 'a[href]', ( event )=>

      link = event.currentTarget

      return unless /^https?:$/.test link.protocol

      inDomain = link.host == window.location.host

      handled = ARGS.handleLink this, link, inDomain

      event.preventDefault() if handled

      return

    return


module.exports = mixin
