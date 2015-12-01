Mixin = requireSource 'various/Mixin'

HistoryViewMixin = requireSource 'mixins/HistoryView'
AjaxMixin = requireSource 'mixins/Ajax'


mixin = Mixin.createArged

  args:

    setView: React.PropTypes.func # ( that, data, url )->
    getHistoryState: React.PropTypes.func # ( that, data, url )->= history state ( { url:, title:, data: } )
    changeAjaxOptions: React.PropTypes.func # ( that, options )->

  defaults:

    getHistoryState: ( that, data, url )-> { url: url }
    changeAjaxOptions: _.noop

  mixin: ( ARGS )->

    HISTORY_VIEW_ARGS = _.merge HistoryViewMixin.pick( ARGS ),

      handlePop: ( that, state )->

        that.loadView state.url, 'replace'

      handleLink: ( that, link, inDomain )->=

        return false unless inDomain

        url = _.map( [ 'pathname', 'search', 'hash' ], _.propertyOf( link ) ).join( '' )

        that.loadView url

        return true


    mixins: [ HistoryViewMixin( HISTORY_VIEW_ARGS ) ]

    loadView: ( url, position = 'push' )->

      that = this

      onSuccess = ( data )->

        state = ARGS.getHistoryState that, data, url

        that.changeHistoryState position, state

        ARGS.setView that, data, url

      ajaxOptions =

        url: url
        dataType: 'json'
        success: onSuccess

      ARGS.changeAjaxOptions this, ajaxOptions

      @sendAjax 'AjaxViewMixin', ajaxOptions, force: true


module.exports = mixin
