Inputs = React.createClass {

  mixins: Mixin.resolve [

    ComponentMixin {

      classes: {

        '-readonly': ''
        'input': ''

      }

    }

    InputMixin()

    FocusPassMixin {

      findFocusables: ( that )->=

        inputs = _.map that.inputs, _.bind ( input, key )->=

          that.refs[ key ]

        , that

        _.filter inputs, ( input )->= input.isFocusable?()

      ##

    }

  ]

  propTypes: {

    'children': React.PropTypes.funced React.PropTypes.any # ( value )->=

    'onSubmit': React.PropTypes.func

  }

  getDefaultProps: ->=

    'defaultValue': {}

  ##

  componentWillMount: ->

    @updateInputs @props, @state

  ##

  componentDidMount: ->

    @keys = _.keys @inputs

  ##

  componentWillUpdate: ( nextProps, nextState )->

    @updateInputs nextProps, nextState

  ##

  componentDidUpdate: ->

    keys = _.keys @inputs

    absent = _.difference @keys, keys

    unless _.isEmpty absent

      @updateInputKey '', ( value )->= _.omit value, absent

    ##

    @keys = keys

  ##

  updateInputs: ( props, state )->

    value = @getValue props, state

    @inputs = @getInputs props.children, value

  ##

  getInputs: ( children, value )->=

    children = _.funced children, value


    unless children

      inputs = {}

      return inputs

    ##


    if React.isValidElement children

      inputs = {}

      inputs[ children.key ] = children

      return inputs

    ##


    if _.isArray children || _.isObject children

      inputs = _.transform children, ( inputs, input, key )->

        inputs[ input.key || key ] = input

      , {}

      return inputs

    ##


    return {}

  ##

  onChange: ( key, value )->

    @setValueKey key, value

  ##

  render: ->=

    { props, classed, inputs } = this

    value = @getValue()


    <div {... @omitProps() } className={ classed '.', '-readonly': props.readOnly }>

      {

        _.map inputs, _.bind ( input, key )->=

          React.cloneElement input, {

            ref: key

            key: key

            className: @mergeClassNames classed( 'input' ), input.props.className

            value: _.get value, key

            readOnly: props.readOnly || input.props.readOnly

            onChange: @cache "onChange.#{ key }", value: ( value )->

              @onChange key, value

              @inputs[ key ].onChange value if @inputs[ key ].onChange

            ##

            onSubmit: @cache "onSubmit.#{ key }", value: ->

              @props.onSubmit()

              @inputs[ key ].onSubmit() if @inputs[ key ].onSubmit

            ##

          }

        , this

      }

    </div>

  ##

}


module.exports = Inputs
