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

  if _.isString allow

    location = allow

    allow = true

  ##

  return unless allow == true && _.isString location

  simulateLink location, ReactDOM.findDOMNode that

##


AjaxMixin = Mixin.create {

  name: 'AjaxMixin'

  mixin: _.once ->=

    getInitialState: ->=

      'ajaxes': {}

    ##

    getInitialMembers: ->=

      'ajaxes': {}

    ##

    componentWillUnmount: ->

      _.each @ajaxes, _.bind ( ajax, name )->

        @abortAjax name

      , this

    ##

    sendAjax: ( name, options )->

      options = _.clone options

      return if _.isEmpty options


      if @ajaxes[ name ]

        return unless options.force

        @abortAjax name

      ##

      delete options.force


      options.success = _.queue options.success, _.partial onAjaxSuccess, this, options.redirect

      delete options.redirect


      options.complete = _.queue _.partial( toggleAjax, this, name, false ), options.complete

      ajax = $.ajax options

      toggleAjax this, name, ajax

    ##

    isWaitingAjax: ( name )->=

      if arguments.length == 0

        ! _.isEmpty @ajaxes

      else

        Boolean @ajaxes[ name ]

      ##

    ##

    abortAjax: ( name )->

      toggleAjax this, name, false

    ##

  ##

}


module.exports = AjaxMixin
