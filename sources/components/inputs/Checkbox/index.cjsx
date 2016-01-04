Checkbox = React.createClass

  mixins: Mixin.resolve [

    ComponentMixin

      classes:

        '-readonly': ''
        '-checked': ''

      ##

    ##

    InputMixin

  ]

  onChange: ->

    @setValue ! Boolean @getValue()

  ##

  onLabelClick: ->

    @onChange()

  ##

  render: ->=

    { props, classed } = this

    value = @getValue()


    <input

      {... @omitProps() }

      type='checkbox'

      className={ classed '.', '-checked': value, '-readonly': props.readOnly }

      checked={ Boolean value }

      onChange={ @onChange }

    />

  ##

##


module.exports = Checkbox
