toggleAjaxRequest = ( that, name, request )->

  if request

    that.ajax_requests[ name ] = request

  else

    that.ajax_requests[ name ]?.abort()

    delete that.ajax_requests[ name ]

  that.setState ajax_requests: _.mapValues that.ajax_requests, -> true

  return


mixin =

  getInitialState: ->

    ajax_requests: {}

  componentWillMount: ->

    @ajax_requests = {}

    return

  sendAjax: ( name, options, force )->

    if @ajax_requests[ name ]

      return unless force

      @abortAjax name

    that = this

    params = _.clone options

    params.complete = ->

      that.abortAjax name

      _.pass options.complete, arguments

      return

    request = $.ajax params

    toggleAjaxRequest that, name, request

    return

  abortAjax: ( name )->

    toggleAjaxRequest this, name, false

    return

  componentWillUnmount: ->

    @abortAjax name for name of @ajax_requests

    return


React.mixins.add 'ajax_sender', mixin
