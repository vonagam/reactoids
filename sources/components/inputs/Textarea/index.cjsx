Textarea = React.createClass {

  mixins: Mixin.resolve [

    ComponentMixin {

      classes: {

        '-value': ''
        '-readonly': ''

      }

    }

    InputMixin

  ]

  getDefaultProps: ->=

    'defaultValue': ''

  ##

  onChange: ( event )->

    @setTempValue event.target.value

  ##

  onBlur: ( event )->

    @setValue event.target.value

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


    <textarea

      {... @omitProps() }

      className={ classed '.', '-value': value, '-readonly': props.readOnly }

      value={ value }

      onChange={ @onChange }

      onBlur={ @callback 'onBlur, props.onBlur' }

    />

  ##

}


module.exports = Textarea
