Input = React.createClass {

  mixins: Mixin.resolve [

    ComponentMixin {

      classes: {

        '-value': ''
        '-readonly': ''

      }

    }

    InputMixin

  ]

  propTypes: {

    'type': React.PropTypes.string

    'onSubmit': React.PropTypes.func

  }

  getDefaultProps: ->=

    'type': 'text'

    'defaultValue': ''

  ##

  onChange: ( event )->

    @setTempValue event.target.value

  ##

  onBlur: ( event )->

    @setValue event.target.value

  ##

  onKeyDown: ( event )->

    if event.key == 'Enter'

      event.target.blur()

      _.funced @props.onSubmit

    ##

  ##

  onLabelClick: ->

    @focus()

  ##

  focus: ->

    @dom().focus()

  ##

  blur: ->

    @dom().blur()

  ##

  render: ->=

    { props, classed } = this

    value = @getValue()


    <input

      {... @omitProps() }

      className={ classed '.', '-value': value, '-readonly': props.readOnly }

      value={ value }

      type={ props.type }

      onChange={ @onChange }

      onBlur={ @callback 'onBlur, props.onBlur' }

      onKeyDown={ @callback 'onKeyDown, props.onKeyDown' }

    />

  ##

}


module.exports = Input
