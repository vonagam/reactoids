# mixins

BaseKeyMixin = requireSource 'mixins/BaseKey'


InputMixin = Mixin.create {

  name: 'InputMixin'

  mixins: [

    BaseKeyMixin

  ]

  mixin: _.once ->=

    BaseKeyArgs = {

      name: 'value'

      get: ( that, props, state )->= that.getValue props, state

      set: ( that, value, callback )-> that.setValue value, callback

    }


    mixins: [

      BaseKeyMixin BaseKeyArgs

    ]

    propTypes: {

      'value': React.PropTypes.any

      'defaultValue': React.PropTypes.any

      'onChange': React.PropTypes.func # ( value )->

      'onTempChange': React.PropTypes.func # ( value )->

      'readOnly': React.PropTypes.bool

      'inputDelay': React.PropTypes.number

    }

    getDefaultProps: ->=

      'inputDelay': 100

    ##

    getInitialState: ->=

      'inputTemp': undefined

      'inputReal': undefined

    ##

    getInitialMembers: ->=

      'inputTimeout': undefined

    ##

    componentWillReceiveProps: ( nextProps )->

      if @props.value != nextProps.value

        clearTimeout @inputTimeout

        @setState {

          inputTemp: undefined

          inputReal: undefined

        }

      ##

    ##

    componentWillUnmount: ->

      clearTimeout @inputTimeout

    ##

    getValue: ( props = @props, state = @state )->=

      return state.inputTemp if state.inputTemp != undefined

      return props.value if props.value != undefined

      return state.inputReal if state.inputReal != undefined

      return props.defaultValue

    ##

    setValue: ( value, callback )->

      return if @props.readOnly

      clearTimeout @inputTimeout

      @setState inputReal: value, callback

      @inputTimeout = setTimeout _.bind( @setState, this, inputTemp: undefined ), 0 if @state.inputTemp != undefined

      @props.onChange? value

    ##

    setTempValue: ( value, callback )->

      return if @props.readOnly

      return @setValue value, callback if @props.inputDelay == 0

      clearTimeout @inputTimeout

      @setState inputTemp: value, callback

      @props.onTempChange? value

      return if @props.inputDelay < 0

      @inputTimeout = setTimeout _.partial( @setValue, value ), @props.inputDelay

    ##

  ##

}


module.exports = InputMixin
