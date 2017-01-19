# mixins

RenderSlotsMixin = requireSource 'mixins/RenderSlots'


Field = React.createClass {

  mixins: Mixin.resolve [

    ComponentMixin {

      classes: {

        '-readonly': ''
        '-focused': ''
        '-filled': ''
        'input': ''

      }

    }

    InputMixin()

    FocusPassMixin {

      findFocusables: ( that )->=

        inputs = [ that.refs.input ]

        _.filter inputs, ( input )->= input.isFocusable?()

      ##

    }

    RenderSlotsMixin names: [ 'content' ]

  ]

  propTypes: {

    'children': React.PropTypes.element.isRequired

    'onFocus': React.PropTypes.func

    'onBlur': React.PropTypes.func

    'onSubmit': React.PropTypes.func

  }

  getDefaultProps: ->=

    'renderContent': ( that, slotProps, userProps )->=

      { input } = slotProps


      input

    ##

  ##

  getInitialState: ->=

    'focus': false

  ##

  onFocus: ->

    @setState focus: true

  ##

  onBlur: ->

    @setState focus: false

  ##

  render: ->=

    { props, state, classed } = this

    value = @getValue()


    inputProps = props.children.props

    input = React.cloneElement props.children, {

      ref: 'input'

      key: 'input'

      className: @mergeClassNames classed( 'input', '-readonly': props.readOnly ), inputProps.className

      value: value

      readOnly: props.readOnly

      inputDelay: -1

      onChange: @setValue

      onTempChange: @setTempValue

      onFocus: @callback 'onFocus, props.onFocus, props.children.props.onFocus'

      onBlur: @callback 'onBlur, props.onBlur, props.children.props.onBlur'

      onSubmit: @callback 'props.onSubmit, props.children.props.onSubmit'

    }


    content = @renderContent { input }


    <div

      {... @omitProps() }

      className={ classed '.', '-focused': state.focus, '-filled': value != undefined && value != '' }

      children={ content }

    />

  ##

}


module.exports = Field
