ComponentMixin = requireSource 'mixins/Component'
OptionsInputMixin = requireSource 'mixins/OptionsInput'


ComponentArgs = classes:

  '-value': ''
  '-readonly': ''
  'option':
    '-blank': ''
    '-selected': ''


Select = React.createClass

  displayName: 'Select'

  mixins: Mixin.resolve [ ComponentMixin( ComponentArgs ), OptionsInputMixin ]

  onChange: ( event )->

    options = @getOptions()

    selectValue = event.target.value

    value = options[ selectValue ].value

    @setValue value

    event.target.blur()

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

      }
      {

        _.map options, ( option, index )->=

          <option
            key={ index }
            className={ classed 'option', '-selected': option.selected }
            value={ index }
          >
            {

              option.label

            }
          </option>

      }
    </select>


module.exports = Select
