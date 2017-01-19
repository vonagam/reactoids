# dependencies

XMLHttpRequest = requireWindow 'XMLHttpRequest' # https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest

ProgressEvent = requireWindow 'ProgressEvent' # https://developer.mozilla.org/en-US/docs/Web/API/ProgressEvent

# mixins

EventListenerMixin = requireSource 'mixins/EventListener'


AjaxProgressesMixin = Mixin.create {

  name: 'AjaxProgressesMixin'

  args: {

    'filterRequest': React.PropTypes.func # ( that, xhr, options )->= bool

    'onRequestStart': React.PropTypes.func # ( that, request )->

    'onRequestUpdate': React.PropTypes.func # ( that, request )->

    'onRequestFinish': React.PropTypes.func # ( that, request )->

  }

  defaults: {

    'filterRequest': _.constant true

    'onRequestStart': _.noop

    'onRequestUpdate': _.noop

    'onRequestFinish': _.noop

  }

  mixins: [

    EventListenerMixin

  ]

  mixin: ( ARGS )->=

    mixins: [

      EventListenerMixin()

    ]

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

            updatedAt: new Date

          }

          startRequest = ->

            ARGS.onRequestStart that, request

          ##

          updateRequest = ( attrs )->

            _.assign request, attrs

            request.count += 1

            request.updatedAt = new Date

            ARGS.onRequestUpdate that, request

          ##

          finishRequest = ->

            ARGS.onRequestFinish that, request

          ##


          listenerKeys = []

          _.each { download: xhr, upload: xhr.upload }, ( xhr, direction )->

            _.each [ 'progress', 'load', 'abort', 'error' ], ( status )->

              callback =

                if status == 'progress'

                  ( event )->

                    progress = if event.lengthComputable then event.loaded / event.total else undefined

                    updateRequest status: status, progress: progress

                else

                  ( event )->

                    _.each listenerKeys, ( listenerKey )-> that.removeEventListener listenerKey

                    updateRequest status: status, progress: 1, finishedAt: new Date

                    finishRequest()

                  ##

                ##

              ##


              listenerKey = "AjaxProgressesMixin:#{ request.id }:#{ direction }:#{ status }"

              listenerKeys.push listenerKey


              that.addEventListener listenerKey, target: xhr, event: status, jquery: false, callback: callback

            ##

          ##

          startRequest()

          updateRequest()

          xhr

        ##

      ##

    ##

  ##

}


unless _.get( XMLHttpRequest, 'prototype.addEventListener' ) && ProgressEvent

  AjaxProgressesMixin = Mixin.create {

    name: 'AjaxProgressesMixin'

    mixin: _.once ->=

      {}

    ##

  }

##


module.exports = AjaxProgressesMixin
