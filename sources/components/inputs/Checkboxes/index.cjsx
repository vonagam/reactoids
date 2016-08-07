# mixins

MultipleOptionsInputMixin = requireSource 'mixins/MultipleOptionsInput'


Checkboxes = React.createClass {

  mixins: Mixin.resolve [

    ComponentMixin {

      classes: {

        '-value': ''
        '-readonly': ''
        'option':
          '-selected': ''
          'input': ''
          'label': ''

      }

    }

    MultipleOptionsInputMixin

  ]

  onClick: ( optionIndex )->

    options = @getOptions()


    option = options[ optionIndex ]

    option.selected = ! option.selected


    selectedOptions = _.filter options, 'selected'

    value = _.map selectedOptions, 'value'


    return if value.length == 0 && @props.allowBlank == false


    @setValue value

  ##

  render: ->=

    { props, classed } = this

    value = @getValue()

    options = @getOptions()


    <div {... @omitProps() } className={ classed '.', '-value': value.length > 0, '-readonly': props.readOnly }>

      {

        _.map options, _.bind ( option, index )->=

          <div

            key={ index }

            className={ classed 'option', '-selected': option.selected }

            onClick={ _.partial @onClick, index }

          >

            <input className={ classed 'input' } type='checkbox' checked={ option.selected } onChange={ _.noop } />

            <label className={ classed 'label' }>{ option.label }</label>

          </div>

        , this

      }

    </div>

  ##

}


module.exports = Checkboxes
