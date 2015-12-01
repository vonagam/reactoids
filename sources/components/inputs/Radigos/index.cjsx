Mixin = requireSource 'various/Mixin'
ComponentMixin = requireSource 'mixins/Component'
OptionsInputMixin = requireSource 'mixins/OptionsInput'


ComponentArgs =

  classes:

    '-readonly': ''
    'radigo':
      '-checked': ''


Radigos = React.createClass

  displayName: 'Radigos'

  mixins: Mixin.resolve [ ComponentMixin( ComponentArgs ), OptionsInputMixin ]

  onClick: ( option )->

    return if option.selected && ! @props.allowBlank

    @setValue if option.selected then undefined else option.value

  render: ->=

    <div
      {... @omitProps() }
      className={ @classed '.', '-readonly': @props.readOnly }
    >
      {

        _.map @getOptions(), ( option, index )->=

          <div
            key={ index }
            className={ @classed 'radigo', '-checked': option.selected } 
            onClick={ _.partial @onClick, option }
          >
            { 

              option.label

            }
          </div>

        , this

      }
    </div>


module.exports = Radigos
