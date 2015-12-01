Mixin = requireSource 'various/Mixin'

#§global '$', 'http://jquery.com'

findDOM = requireSource 'various/findDOM'


mixin = Mixin.createArged

  args:

    handleLink: React.PropTypes.func # ( that, link, inDomain )->= true if handled

  mixin: ( ARGS )->=

    componentDidMount: ->

      $( findDOM this ).on 'click', 'a[href]', _.bind ( event )->

        link = event.currentTarget

        return unless /^https?:$/.test link.protocol

        inDomain = link.host == window.location.host

        handled = ARGS.handleLink this, link, inDomain

        event.preventDefault() if handled

      , this


module.exports = mixin
