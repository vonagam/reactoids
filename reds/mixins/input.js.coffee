mixin =

  propTypes:

    value: React.PropTypes.any
    defaultValue: React.PropTypes.any
    inputDelay: React.PropTypes.number
    onChange: React.PropTypes.func
    onTempChange: React.PropTypes.func

  getDefaultProps: ->

    inputDelay: 100

  getInitialState: ->

    input_temp: undefined
    input_real: undefined

  getValue: ->

    return @state.input_temp if @state.input_temp != undefined
    return @props.value if @props.value != undefined
    return @state.input_real if @state.input_real != undefined
    return @props.defaultValue

  setValue: ( value )->

    clearTimeout @_input_timeout

    @props.onChange? value, this

    @setState input_temp: undefined, input_real: value

    return

  setTempValue: ( value )->

    return @setValue value unless @props.inputDelay

    clearTimeout @_input_timeout

    @setState input_temp: value

    @props.onTempChange? value, this

    @_input_timeout = setTimeout =>

      @setValue value

      return

    , @props.inputDelay

    return

  componentWillUnmount: ->

    clearTimeout @_input_timeout

    return

  componentWillReceiveProps: ( next_props )->

    if @props.value != undefined && next_props.value == undefined

      @setState input_real: undefined

    return


React.mixins.add 'input', mixin
