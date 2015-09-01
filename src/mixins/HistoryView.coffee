BaseViewMixin = require '../mixins/LinkView'
EventListenerMixin = require '../mixins/EventListener'


INSTANCE = undefined
ID = undefined


mixin = ( ARGS )->

  # handlePop ( that, state )->
  # getId ( that )->
  # handleConflict ( that, state, stateId, thatId )->
  # getInitialData ( that )->

  ARGS = _.defaults {}, ARGS, {

    getId: _.uniqueId

    handleConflict: -> window.location.reload()

    getInitialData: _.noop

  }

  BASE_VIEW_ARGS = _.pick ARGS, 'handleLink'


  onHistoryPop = ( event )->

    return unless _.has event.state, 'HistoryViewMixin'

    state = {

      url: _.map( [ 'pathname', 'search', 'hash' ], _.propertyOf( window.location ) ).join( '' )
      data: state.data
      title: document.title

    }

    return ARGS.handleConflict INSTANCE, state, event.state.id, ID if event.state.id != ID

    ARGS.handlePop INSTANCE, state

    return


  mixins: [ EventListenerMixin, BaseViewMixin( BASE_VIEW_ARGS ) ]

  changeHistoryState: ( position, state )->

    return unless window.history

    window.history[ "#{ position }State" ] { HistoryViewMixin: true, data: state.data, id: ID }, state.title, state.url

    return

  componentWillMount: ->

    return unless window.history

    INSTANCE = this

    ID = ARGS.getId this

    data = ARGS.getInitialData this

    @changeHistoryState 'replace', data: data

    @addEventListener 'HistoryView:popstate', {

      target: window
      event: 'popstate'
      callback: onHistoryPop

    }

    return

  componentWillUnmount: ->

    INSTANCE = null

    return


module.exports = mixin
