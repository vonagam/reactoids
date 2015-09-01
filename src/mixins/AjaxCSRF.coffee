mixin = ( ARGS )->

  # getToken ( that, options, originalOptions )->


  componentWillMount: ->

    $.ajaxPrefilter ( options, originalOptions, xhr )=>

      return if options.crossDomain

      token = ARGS.getToken this, options, originalOptions

      return unless token

      xhr.setRequestHeader 'X-CSRF-Token', token

      return

    return


module.exports = mixin
