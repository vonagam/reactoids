Checkbox = React.createClass {

  mixins: Mixin.resolve [

    ComponentMixin {

      classes: {

        '-readonly': ''
        '-selected': ''
        'input': ''

      }

    }

    InputMixin

  ]

  onClick: ->

    @setValue ! Boolean @getValue()

  ##

  onLabelClick: ->

    @onClick()

  ##

  render: ->=

    { props, classed } = this

    value = @getValue()


    <div

      {... @omitProps() }

      className={ classed '.', '-selected': value, '-readonly': props.readOnly }

      onClick={ @callback 'onClick, props.onClick' }

    >

      <input

        type='checkbox'

        className={ classed 'input' }

        checked={ Boolean value }

        onChange={ _.noop }

      />

    </div>

  ##

}


module.exports = Checkbox
