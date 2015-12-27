$ = requireDependency 'jquery'
Routes = requireDependency 'js-routes'

Mixin = requireSource 'various/Mixin'

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

  allow = _.funced redirect, location, data, status, xhr

  return unless allow == true || _.isString allow

  if _.isString allow

    location = allow

    if Routes && /^[\w_]+$/.test( location ) && Routes[ location ]

      location = Routes[ location ]()

  simulateLink location, findDOM that


mixin =

  Mixin.createPlain

    getInitialState: ->=

      ajaxes: {}

    getInitialMembers: ->=

      ajaxes: {}

    abortAjax: ( name )->

      toggleAjax this, name, false

    sendAjax: ( name, options )->

      return if _.isEmpty options

      if @ajaxes[ name ]

        return unless options.force

        delete options.force

        @abortAjax name

      options = _.clone options

      options = _.mapKeys options, ( value, key )->=

        if /^on[A-Z]/.test( key ) then _.camelCase( key.replace /^on/, '' ) else key

      if Routes && /^[\w_]+$/.test( options.url ) && Routes[ options.url ]

        options.url = Routes[ options.url ]() 

      if _.has options, 'type'

        options.method = options.method || options.type

        delete options.type

      if options.redirect

        options.success = _.queue options.success, _.partial onAjaxSuccess, this, options.redirect

        delete options.redirect

      options.complete = _.queue _.partial( toggleAjax, this, name, false ), options.complete

      ajax = $.ajax options

      toggleAjax this, name, ajax

    componentWillUnmount: ->

      _.each @ajaxes, ( ajax, name )->

        @abortAjax name

      , this


module.exports = mixin
