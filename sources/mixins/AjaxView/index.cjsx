Mixin = requireSource 'various/Mixin'

BaseViewMixin = requireSource 'mixins/BaseView'

HistoryViewMixin = requireSource 'mixins/HistoryView'

AjaxMixin = requireSource 'mixins/Ajax'

URI = require 'urijs'


mixin = Mixin.createArged

  args:

    setView: React.PropTypes.func # ( that, data, url )->
    getHistoryState: React.PropTypes.func # ( that, data, url )->= history state ( { url:, title:, data: } )
    changeAjaxOptions: React.PropTypes.func # ( that, options )->

  defaults:

    getHistoryState: ( that, data, url )->= { url: url }
    changeAjaxOptions: _.noop

    # HistoryView

    handleHistoryData: ( that, state )->

      that.loadView state.url, 'replace'

    shouldHandleLink: ( that, link )->=

      return false unless BaseViewMixin.defaults.shouldHandleLink that, link

      return false if link.getAttribute( 'data-no-ajax' ) == 'true'

      return true

    handleLink: ( that, link )->=

      url = _.map( [ 'pathname', 'search', 'hash' ], _.propertyOf( link ) ).join( '' )

      that.loadView url

      return true

  mixins: [ HistoryViewMixin, AjaxMixin ]

  mixin: ( ARGS )->=

    mixins: [ HistoryViewMixin( HistoryViewMixin.pick ARGS ), AjaxMixin ]

    loadView: ( url, position = 'push' )->

      that = this

      onSuccess = ( data )->

        state = ARGS.getHistoryState that, data, url

        ARGS.setView that, data, url

        that.changeHistoryState position, state

      uri = new URI url

      if ! /\.[^\.]+$/.test uri.pathname()

        uri.pathname "#{ uri.pathname() }.json"

      ajaxOptions =

        url: uri.toString()
        dataType: 'json'
        success: onSuccess

      ARGS.changeAjaxOptions this, ajaxOptions

      @sendAjax 'AjaxViewMixin', ajaxOptions, force: true


module.exports = mixin
