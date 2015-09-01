HistoryViewMixin = require '../mixins/HistoryView'
AjaxMixin = require '../mixins/Ajax'


mixin = ( ARGS )->

  # setView ( that, data, url )->
  # getState ( that, data, url )-> :url, :title, :data
  # addOptions ( that, options )->

  ARGS = _.default {}, ARGS, {

    getState: ( that, data, url )-> { url: url }

    addOptions: _.noop

  }

  HISTORY_VIEW_ARGS = _.merge {}, _.pick( ARGS, [ 'getId', 'handleConflict', 'getInitialData', 'handlePop', 'handleLink' ] ), {

    handlePop: ( that, state )->

      that.loadView state.url, 'replace'

      return

    handleLink: ( that, link, inDomain )->

      return false unless inDomain

      url = _.map( [ 'pathname', 'search', 'hash' ], _.propertyOf( link ) ).join( '' )

      that.loadView url

      return true

  }


  sendAjax = ( that, url, onSuccess )->

    ajaxOptions =

      url: url
      dataType: 'json'
      success: onSuccess

    ARGS.addOptions that, ajaxOptions

    that.sendAjax 'AjaxViewMixin', ajaxOptions, force: true

    return


  mixins: [ HistoryViewMixin( HISTORY_VIEW_ARGS ) ]

  loadView: ( url, position = 'push' )->

    sendAjax this, url, ( data )=>

      state = ARGS.getState this, data, url

      @changeHistoryState position, state

      ARGS.setView this, data, url

      return

    return


module.exports = mixin
