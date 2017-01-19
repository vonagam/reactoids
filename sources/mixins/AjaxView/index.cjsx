# mixins

BaseViewMixin = requireSource 'mixins/BaseView'

HistoryViewMixin = requireSource 'mixins/HistoryView'

AjaxMixin = requireSource 'mixins/Ajax'


AjaxViewMixin = Mixin.create {

  name: 'AjaxViewMixin'

  args: {

    'setView': React.PropTypes.func # ( that, data, url )->

    'getHistoryState': React.PropTypes.func # ( that, data, url )->= history state { url:, title: }

    'changeAjaxOptions': React.PropTypes.func # ( that, options )->

  }

  defaults: {

    'getHistoryState': ( that, data, url )->= { url: url }

    'changeAjaxOptions': _.noop

    # HistoryViewMixin

    'shouldHandleLink': ( that, link )->=

      return false unless BaseViewMixin.defaults.shouldHandleLink that, link

      return false if link.getAttribute( 'data-no-ajax' ) == 'true'

      return true

    ##

    'handleLink': ( that, link )->=

      url = _.map( [ 'pathname', 'search', 'hash' ], _.propertyOf( link ) ).join( '' )

      that.loadView url

      return true

    ##

  }

  mixins: [

    HistoryViewMixin

    AjaxMixin

  ]

  mixin: ( ARGS )->=

    mixins: [

      HistoryViewMixin HistoryViewMixin.pick ARGS

      AjaxMixin()

    ]

    loadView: ( url, position = 'push' )->

      onSuccess = _.bind ( data )->

        state = ARGS.getHistoryState this, data, url

        ARGS.setView this, data, url

        @changeHistoryState position, state

      , this


      target = document.createElement 'a'

      target.href = url

      target.pathname += '.json' unless /\.[^\.]+$/.test target.pathname


      ajaxOptions = {

        url: target.href

        dataType: 'json'

        success: onSuccess

      }

      ARGS.changeAjaxOptions this, ajaxOptions


      @sendAjax 'AjaxViewMixin', ajaxOptions, force: true

    ##

  ##

}


module.exports = AjaxViewMixin
