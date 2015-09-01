#§global '$', 'http://jquery.com'
#§global 'Routes', 'http://railsware.github.io/js-routes'

simulateLink = require '../various/simulateLink'
findDOM = require '../various/findDOM'


toggleAjax = ( that, name, ajax )->

  if ajax

    that.ajaxes[ name ] = ajax

  else

    that.ajaxes[ name ]?.abort()

    delete that.ajaxes[ name ]

  that.setState ajaxes: _.mapValues that.ajaxes, -> true

  return


onAjaxSuccess = ( that, redirect, data, status, xhr )->

  location = xhr.getResponseHeader 'Location'

  check = _.funced redirect, location, data, status, xhr

  return unless check

  location = check if _.isString check

  simulateLink location, findDOM that

  return


mixin =

  getInitialState: ->

    ajaxes: {}

  getInitialMembers: ->

    ajaxes: {}

  abortAjax: ( name )->

    toggleAjax this, name, false

    return

  sendAjax: ( name, options, options = {} )->

    return if _.isEmpty options

    if @ajaxes[ name ]

      return unless options.force

      @abortAjax name

    params = _.clone options

    params = _.mapKeys params, ( value, key )-> 

      if /^on[A-Z]/.test( key ) then _.camelCase( key.replace /^on/, '' ) else key

    params.url = Routes[ params.url ]() if /^\w+$/.test params.url

    params.method = ( params.method || params.type || 'get' ).toUpperCase()

    params.complete = _.queue _.partial( @abortAjax, name ), params.complete

    params.success = _.queue params.success, _.partial( onAjaxSuccess, this, params.redirect ) if params.redirect

    ajax = $.ajax params

    toggleAjax this, name, ajax

    return

  componentWillUnmount: ->

    _.each @ajaxes, ( ajax, name )->

      @abortAjax name

      return

    , this

    return


module.exports = mixin
