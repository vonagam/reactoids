# dependencies

$ = requireDependency 'jquery' # jquery/jquery, http://jquery.com

# mixins

EventListenerMixin = requireSource 'mixins/EventListener'


AjaxHeadersMixin = Mixin.create {

  name: 'AjaxHeadersMixin'

  args: {

    'headers': React.PropTypes.funced React.PropTypes.objectOf React.PropTypes.funced React.PropTypes.string # ( that, options )->= string

    'filterRequest': React.PropTypes.func # ( that, options )->= bool

  }

  defaults: {

    'filterRequest': ( that, options )->= options.crossDomain == false

  }

  mixins: [

    EventListenerMixin

  ]

  mixin: ( ARGS )->=

    mixins: [

      EventListenerMixin()

    ]

    componentWillMount: ->

      that = this

      @addEventListener 'AjaxHeadersMixin', event: 'ajaxSend', callback: ( event, xhr, options )->

        return unless ARGS.filterRequest that, options

        headers = _.funced ARGS.headers, that, options

        _.each headers, ( value, key )->

          value = _.funced value, that, options

          return if value == undefined

          xhr.setRequestHeader key, value

        ##

      ##

    ##

  ##

}


module.exports = AjaxHeadersMixin
