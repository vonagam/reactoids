mixin =

  Mixin.createPlain

    propTypes:

      'value': React.PropTypes.any

      'defaultValue': React.PropTypes.any

      'onChange': React.PropTypes.func

      'onTempChange': React.PropTypes.func

      'readOnly': React.PropTypes.bool

      'inputDelay': React.PropTypes.number

    ##

    getDefaultProps: ->=

      'inputDelay': 100

    ##

    getInitialState: ->=

      inputTemp: undefined
      inputReal: undefined

    ##

    getInitialMembers: ->=

      inputTimeout: undefined

    ##

    getValue: ( props = @props, state = @state )->=

      return @state.inputTemp if @state.inputTemp != undefined
      return @props.value if @props.value != undefined
      return @state.inputReal if @state.inputReal != undefined
      return @props.defaultValue

    ##

    setValue: ( value )->

      return if @props.readOnly

      clearTimeout @inputTimeout

      @setState(

        inputTemp: undefined
        inputReal: value

      )

      @props.onChange? value

    ##

    setTempValue: ( value )->

      return if @props.readOnly

      return @setValue value if @props.inputDelay == 0

      clearTimeout @inputTimeout

      @setState inputTemp: value

      @props.onTempChange? value

      return if @props.inputDelay < 0

      @inputTimeout = setTimeout _.partial( @setValue, value ), @props.inputDelay

    ##

    componentWillReceiveProps: ( nextProps )->

      if @props.value != nextProps.value

        clearTimeout @inputTimeout

        @setState(

          inputTemp: undefined
          inputReal: undefined

        )

      ##

    ##

    componentWillUnmount: ->

      clearTimeout @inputTimeout

    ##

  ##

##


module.exports = mixin
