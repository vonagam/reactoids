Mixin = requireSource 'various/Mixin'


mixin = Mixin.createArged

  args:

    getToken: React.PropTypes.func # ( that, options, originalOptions )->

  mixin: ( ARGS )->=

    componentWillMount: ->

      that = this

      $.ajaxPrefilter ( options, originalOptions, xhr )->

        return unless that.isMounted()

        return if options.crossDomain

        token = ARGS.getToken that, options, originalOptions

        return unless token

        xhr.setRequestHeader 'X-CSRF-Token', token


module.exports = mixin
