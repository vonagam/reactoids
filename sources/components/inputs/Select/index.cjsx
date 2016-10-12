# mixins

SingleOptionInputMixin = requireSource 'mixins/SingleOptionInput'


Select = React.createClass {

  mixins: Mixin.resolve [

    ComponentMixin {

      classes: {

        '-value': ''
        '-readonly': ''
        'option':
          '-blank': ''
          '-selected': ''

      }

    }

    SingleOptionInputMixin

  ]

  onChange: ( event )->

    options = @getOptions()

    optionIndex = event.target.value


    value = if optionIndex == '-1' then undefined else options[ optionIndex ].value

    @setValue value


    event.target.blur()

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

    options = @getOptions()

    selectedIndex = _.findIndex options, selected: true


    <select

      {... @omitProps() }

      className={ classed '.', '-value': selectedIndex != -1, '-readonly': props.readOnly }

      value={ selectedIndex }

      onChange={ @onChange }

    >

      {

        if props.allowBlank

          <option

            className={ classed 'option', '-blank', '-selected': selectedIndex == -1 }

            value={ -1 }

          />

        ##

      }

      {

        _.map options, ( option, index )->=

          <option

            key={ index }

            className={ classed 'option', '-selected': option.selected }

            value={ index }

            children={ option.label }

          />

        ##

      }

    </select>

  ##

}


module.exports = Select
