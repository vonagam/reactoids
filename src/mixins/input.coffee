mixin =

  propTypes:

    value: React.PropTypes.any
    defaultValue: React.PropTypes.any
    readOnly: React.PropTypes.bool
    inputDelay: React.PropTypes.number
    onChange: React.PropTypes.func
    onTempChange: React.PropTypes.func

  getDefaultProps: ->

    inputDelay: 100

  getInitialState: ->

    inputTemp: undefined
    inputReal: undefined

  getInitialMembers: ->

    inputTimeout: undefined

  getValue: ( props = @props, state = @state )->

    return state.inputTemp if state.inputTemp != undefined
    return props.value if props.value != undefined
    return state.inputReal if state.inputReal != undefined
    return props.defaultValue

  setValue: ( value )->

    return if @props.readOnly

    clearTimeout @inputTimeout

    @setState( 

      inputTemp: undefined
      inputReal: value

    )

    @props.onChange? value

    return

  setTempValue: ( value )->

    return if @props.readOnly

    return @setValue value if @props.inputDelay == 0

    clearTimeout @inputTimeout

    @setState inputTemp: value

    @props.onTempChange? value

    return if @props.inputDelay < 0

    @inputTimeout = setTimeout _.partial( @setValue, value ), @props.inputDelay

    return

  componentWillReceiveProps: ( nextProps )->

    if @props.value != nextProps.value

      clearTimeout @inputTimeout

      @setState(

        inputTemp: undefined
        inputReal: undefined

      )

    return

  componentWillUnmount: ->

    clearTimeout @inputTimeout

    return


module.exports = mixin
