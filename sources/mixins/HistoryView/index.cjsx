Mixin = requireSource 'various/Mixin'

BaseViewMixin = requireSource 'mixins/BaseView'


History =

  states: []

  index: undefined

  instances: {}

  getId: ( component, ARGS )->=

    _.funced ARGS.getHistoryId, component

  startListen: ->

    window.addEventListener 'popstate', _.binded History, 'onStatePop'

  addComponent: ( component, ARGS )->

    id = @getId component, ARGS

    throw new Error "HistoryViewMixin: view with id '#{ id }' is already presented" if @instances[ id ]

    @instances[ id ] = { component: component, ARGS: ARGS }

    @startListen() if @index == undefined

    @updateState component, ARGS, true

  removeComponent: ( component, ARGS )->

    id = @getId component, ARGS

    delete @instances[ id ]

    @updateState component, ARGS, false

  updateState: ( component, ARGS, bool )->

    id = @getId component, ARGS

    datas = _.get window.history.state, 'datas'

    if datas

      if bool

        data = ARGS.getHistoryData component

        return if _.isEqual datas[ id ], data

      else

        return if ! _.has datas, id

    @changeState component, ARGS, 'replace'

  changeState: ( component, ARGS, position, options = {} )->=

    currentState = _.defaults {}, window.history.state, index: 0, datas: {}

    if position == 'replace'

      state = currentState

    if position == 'push'

      state = {}

      state.id = @getId component, ARGS

      state.index = currentState.index + 1

      @states = @states.slice 0, state.index

    state.HistoryViewMixin = true

    state.datas = _.mapValues @instances, ( instance )->= instance.ARGS.getHistoryData instance.component

    @states[ state.index ] = state

    @index = state.index

    window.history[ "#{ position }State" ] state, options.title, options.url

  onStatePop: ( event )->

    return unless _.get event.state, 'HistoryViewMixin'

    eventState = event.state

    historyState = @states[ @index ]

    id = @states[ Math.max eventState.index, historyState.index ].id

    instance = @instances[ id ]

    if Math.abs( eventState.index - historyState.index ) == 1

      instance.ARGS.handleHistoryData instance.component, eventState.datas[ id ], _.noop

    else

      # i decided for now to skip hard and complex part of solving multiply steps history jump

      if _.isEqual _.keys( eventState.datas ), [ id ]

        instance.ARGS.handleHistoryData instance.component, eventState.datas[ id ], _.noop

      else

        window.location.reload()

    @index = eventState.index



mixin = Mixin.createArged

  args:

    getHistoryId: React.PropTypes.funced React.PropTypes.string # ( that )->=
    getHistoryData: React.PropTypes.func # ( that )->=
    handleHistoryData: React.PropTypes.func # ( that, data, callback )->

  defaults:

    getHistoryId: 'default'

  mixins: [ BaseViewMixin ]

  mixin: ( ARGS )->=

    mixins: [ BaseViewMixin BaseViewMixin.pick ARGS ]

    changeHistoryState: ( position, options )->

      return unless window.history

      History.changeState this, ARGS, position, options

    componentWillMount: ->

      return unless window.history

      History.addComponent this, ARGS

    componentWillUnmount: ->

      return unless window.history

      History.removeComponent this, ARGS


module.exports = mixin
