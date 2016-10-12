# dependencies

windowHistory = requireWindow 'history' # https://developer.mozilla.org/en-US/docs/Web/API/History

windowLocation = requireWindow 'location' # https://developer.mozilla.org/en-US/docs/Web/API/Location

addWindowEventListener = requireWindow 'addEventListener' # https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener

# mixins

BaseViewMixin = requireSource 'mixins/BaseView'


History =

  state: undefined

  instances: {}

  getId: ( component, ARGS )->=

    _.funced ARGS.getHistoryId, component

  ##

  startListen: ->

    addWindowEventListener 'popstate', _.bindKey History, 'onStatePop'

  ##

  addComponent: ( component, ARGS )->

    id = @getId component, ARGS

    throw new Error "HistoryViewMixin: view with id '#{ id }' is already presented" if @instances[ id ]

    @instances[ id ] = { component: component, ARGS: ARGS }

    @startListen() if @state == undefined

    @changeState 'replace' unless _.isEqual _.get( @state, "datas.#{ id }" ), ARGS.getHistoryData component

  ##

  removeComponent: ( component, ARGS )->

    id = @getId component, ARGS

    delete @instances[ id ]

    @changeState 'replace' if _.has @state.datas, id

  ##

  changeState: ( position, component, ARGS, options = {} )->=

    currentState = _.defaults {}, windowHistory.state, index: 0, datas: {}

    if position == 'replace'

      state = currentState

    ##

    if position == 'push'

      state = {}

      state.id = @getId component, ARGS

      state.index = currentState.index + 1

    ##

    state.HistoryViewMixin = true

    state.datas = _.mapValues @instances, ( instance )->= instance.ARGS.getHistoryData instance.component

    @state = state

    windowHistory[ "#{ position }State" ] state, options.title, options.url

  ##

  onStatePop: ( event )->

    return unless _.get event.state, 'HistoryViewMixin'

    eventState = event.state

    historyState = @state

    id = ( if eventState.index > historyState.index then eventState else historyState ).id

    instance = @instances[ id ]

    return windowLocation.reload() if instance == undefined

    if Math.abs( eventState.index - historyState.index ) == 1

      instance.ARGS.handleHistoryData instance.component, eventState.datas[ id ], _.noop

    else

      if _.isEqual _.keys( eventState.datas ), [ id ]

        instance.ARGS.handleHistoryData instance.component, eventState.datas[ id ], _.noop

      else

        windowLocation.reload()

      ##

    ##

    @state = eventState

  ##

##


mixin = Mixin.createArged

  args:

    'getHistoryId': React.PropTypes.funced React.PropTypes.string # ( that )->=

    'getHistoryData': React.PropTypes.func # ( that )->=

    'handleHistoryData': React.PropTypes.func # ( that, data, callback )->

  ##

  defaults:

    'getHistoryId': 'default'

  ##

  mixins: [ BaseViewMixin ]

  mixin: ( ARGS )->=

    mixins: [ BaseViewMixin BaseViewMixin.pick ARGS ]

    changeHistoryState: ( position, options )->

      History.changeState position, this, ARGS, options

    ##

    componentWillMount: ->

      History.addComponent this, ARGS

    ##

    componentWillUnmount: ->

      History.removeComponent this, ARGS

    ##

  ##

##


unless windowHistory

  mixin = Mixin.createArged mixin: ->= { changeHistoryState: _.noop }

##


module.exports = mixin
