# mixins

InputMixin = requireSource 'mixins/Input'


Textarea = React.createClass

  mixins: Mixin.resolve [

    ComponentMixin

      classes:

        '-value': ''
        '-readonly': ''

      ##

    ##

    InputMixin

  ]

  propTypes:

    'onBlur': React.PropTypes.func

  ##

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

    @dom().focus()

  ##

  render: ->=

    { props, classed } = this

    value = @getValue()


    <textarea

      {... @omitProps() }

      className={ classed '.', '-value': value, '-readonly': props.readOnly }

      value={ value }

      onChange={ @onChange }

      onBlur={ _.queue @onBlur, props.onBlur }

    />

  ##

##


module.exports = Textarea
