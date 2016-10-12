# dependencies

XMLHttpRequest = requireWindow 'XMLHttpRequest' # https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest

ProgressEvent = requireWindow 'ProgressEvent' # https://developer.mozilla.org/en-US/docs/Web/API/ProgressEvent

# mixins

EventListenerMixin = requireSource 'mixins/EventListener'


mixin = Mixin.createArged

  args:

    'filterRequest': React.PropTypes.func # ( that, xhr, options )->=

    'onRequestChange': React.PropTypes.func # ( that, request )->

    'onRequestRemove': React.PropTypes.func # ( that, request )->

  ##

  defaults:

    'filterRequest': _.constant true

    'onRequestRemove': _.noop

  ##

  mixins: [ EventListenerMixin ]

  mixin: ( ARGS )->=

    mixins: [ EventListenerMixin ]

    componentDidMount: ->

      that = this

      $.ajaxPrefilter ( options, originalOptions, jqXHR )->

        return unless that.isMounted()

        return unless ARGS.filterRequest that, jqXHR, options

        originalXHR = options.xhr

        options.xhr = ->=

          xhr = originalXHR.apply this, arguments

          request = {

            id: _.uniqueId()

            xhr: jqXHR

            options: options

            status: 'start'

            progress: 0

            count: 0

            startedAt: new Date

            remove: ->

              ARGS.onRequestRemove that, request

          }

          setRequest = ( attrs )->

            _.assign request, attrs

            request.count += 1

            request.updatedAt = new Date

            ARGS.onRequestChange that, request

          ##

          listenerKeys = []

          _.each { down: xhr, up: xhr.upload }, ( xhr, key )->

            _.each [ 'progress', 'load', 'abort', 'error' ], ( status )->

              callback =

                if status == 'progress'

                  ( event )->

                    progress = if event.lengthComputable then event.loaded / event.total else undefined

                    setRequest status: status, progress: progress

                else

                  ( event )->

                    _.each listenerKeys, ( listenerKey )-> that.removeEventListener listenerKey

                    setRequest status: status, progress: 1, finishedAt: new Date

                  ##

                ##

              ##


              listenerKey = "AjaxProgresses:#{ request.id }:#{ key }:#{ status }"

              listenerKeys.push listenerKey


              that.addEventListener listenerKey, target: xhr, event: status, jquery: false, callback: callback

            ##

          ##

          setRequest()

          xhr

        ##

      ##

    ##

  ##

##


unless _.get( XMLHttpRequest, 'prototype.addEventListener' ) && ProgressEvent

  mixin = Mixin.createArged mixin: ->= {}

##


module.exports = mixin
