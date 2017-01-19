# mixins

MultipleOptionsInputMixin = requireSource 'mixins/MultipleOptionsInput'


MultipleSelect = React.createClass {

  mixins: Mixin.resolve [

    ComponentMixin {

      classes: {

        '-value': ''
        '-readonly': ''
        'option':
          '-selected': ''

      }

    }

    MultipleOptionsInputMixin()

    FocusMixin()

  ]

  onChange: ( event )->

    options = @getOptions()

    select = event.target


    selectedOptions = _.filter select.options, ( option )->= option.selected

    value = _.map selectedOptions, ( option )->= options[ option.value ].value


    return if value.length == 0 && @props.allowBlank == false


    @setValue value

  ##

  onLabelClick: ->

    @focus()

  ##

  render: ->=

    { props, classed } = this

    options = @getOptions()

    selectedIndexes = _.map options, ( option, index )->= if option.selected then index else undefined

    selectedIndexes = _.filter selectedIndexes, _.isNumber


    <select

      {... @omitProps() }

      className={ classed '.', '-value': selectedIndexes.length > 0, '-readonly': props.readOnly }

      multiple={ true }

      value={ selectedIndexes }

      onChange={ @onChange }

    >

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


module.exports = MultipleSelect
