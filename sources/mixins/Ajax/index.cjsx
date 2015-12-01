Mixin = requireSource 'various/Mixin'

#§global '$', 'http://jquery.com'
#§global 'Routes', 'http://railsware.github.io/js-routes'

simulateLink = requireSource 'various/simulateLink'
findDOM = requireSource 'various/findDOM'


toggleAjax = ( that, name, ajax )->

  if ajax

    that.ajaxes[ name ] = ajax

  else

    that.ajaxes[ name ]?.abort()

    delete that.ajaxes[ name ]

  that.setState ajaxes: _.mapValues( that.ajaxes, ->= true )


onAjaxSuccess = ( that, redirect, data, status, xhr )->

  location = xhr.getResponseHeader 'Location'

  check = _.funced redirect, location, data, status, xhr

  return unless check

  location = check if _.isString check

  simulateLink location, findDOM that


mixin =

  Mixin.createPlain

    getInitialState: ->=

      ajaxes: {}

    getInitialMembers: ->=

      ajaxes: {}

    abortAjax: ( name )->

      toggleAjax this, name, false

    sendAjax: ( name, options, flags = {} )->

      return if _.isEmpty options

      if @ajaxes[ name ]

        return unless flags.force

        @abortAjax name

      options = _.clone options

      options = _.mapKeys options, ( value, key )-> 

        if /^on[A-Z]/.test( key ) then _.camelCase( key.replace /^on/, '' ) else key

      options.url = Routes[ options.url ]() if window.Routes && /^\w+$/.test options.url

      options.method = ( options.method || options.type || 'get' ).toUpperCase()

      options.complete = _.queue _.partial( toggleAjax, this, name, false ), options.complete

      options.success = _.queue options.success, _.partial( onAjaxSuccess, this, options.redirect ) if options.redirect

      ajax = $.ajax options

      toggleAjax this, name, ajax

    componentWillUnmount: ->

      _.each @ajaxes, ( ajax, name )->

        @abortAjax name

      , this


module.exports = mixin
