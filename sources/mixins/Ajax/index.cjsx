# dependencies

$ = requireDependency 'jquery' # jquery/jquery, http://jquery.com

# various

simulateLink = requireSource 'various/simulateLink'


toggleAjax = ( that, name, ajax )->

  if ajax

    that.ajaxes[ name ] = ajax

  else

    that.ajaxes[ name ]?.abort()

    delete that.ajaxes[ name ]

  ##

  that.setState ajaxes: _.mapValues( that.ajaxes, ->= true )

##


onAjaxSuccess = ( that, redirect, data, status, xhr )->

  location = xhr.getResponseHeader 'Location'

  allow = _.funced redirect, location, data, status, xhr

  return unless allow == true || _.isString allow

  location = allow if _.isString allow

  return unless _.isString location

  simulateLink location, ReactDOM.findDOMNode that

##


mixin =

  Mixin.createPlain

    getInitialState: ->=

      ajaxes: {}

    ##

    getInitialMembers: ->=

      ajaxes: {}

    ##

    abortAjax: ( name )->

      toggleAjax this, name, false

    ##

    sendAjax: ( name, options )->

      return if _.isEmpty options

      if @ajaxes[ name ]

        return unless options.force

        delete options.force

        @abortAjax name

      ##

      options = _.clone options

      options = _.mapKeys options, ( value, key )->=

        if /^on[A-Z]/.test( key ) then _.camelCase( key.replace /^on/, '' ) else key

      ##

      if options.redirect

        options.success = _.queue options.success, _.partial onAjaxSuccess, this, options.redirect

        delete options.redirect

      ##

      options.complete = _.queue _.partial( toggleAjax, this, name, false ), options.complete

      ajax = $.ajax options

      toggleAjax this, name, ajax

    ##

    componentWillUnmount: ->

      _.each @ajaxes, _.bind ( ajax, name )->

        @abortAjax name

      , this

    ##

  ##

##


module.exports = mixin
