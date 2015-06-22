mixin =

  propTypes:

    value: React.PropTypes.any
    default_value: React.PropTypes.any
    readonly: React.PropTypes.bool
    input_delay: React.PropTypes.number
    onChange: React.PropTypes.func
    onTempChange: React.PropTypes.func

  getDefaultProps: ->

    readonly: false
    input_delay: 100

  getInitialState: ->

    input_temp: undefined
    input_real: undefined

  getValue: ->

    return @state.input_temp if @state.input_temp != undefined
    return @props.value if @props.value != undefined
    return @state.input_real if @state.input_real != undefined
    return @props.default_value

  setValue: ( value )->

    return if @props.readonly

    clearTimeout @_input_timeout

    @setState input_temp: undefined, input_real: value

    @props.onChange? value

    return

  setTempValue: ( value )->

    return if @props.readonly

    return @setValue value if @props.input_delay == 0

    clearTimeout @_input_timeout

    @setState input_temp: value

    @props.onTempChange? value

    @_input_timeout = setTimeout _.partial( @setValue, value ), @props.input_delay unless @props.input_delay < 0

    return

  componentWillUnmount: ->

    clearTimeout @_input_timeout

    return

  componentWillReceiveProps: ( next_props )->

    if @props.value != next_props.value

      clearTimeout @_input_timeout

      @setState input_temp: undefined, input_real: next_props.value

    return


ReactMixinManager.add 'input', mixin
