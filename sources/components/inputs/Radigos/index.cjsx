Radigos = React.createClass

  mixins: Mixin.resolve [

    ComponentMixin

      classes:

        '-readonly': ''
        'radigo':
          '-checked': ''

      ##

    ##

    OptionsInputMixin

  ]

  onClick: ( option )->

    return if option.selected && ! @props.allowBlank

    @setValue if option.selected then undefined else option.value

  ##

  render: ->=

    { props, classed } = this


    <div {... @omitProps() } className={ classed '.', '-readonly': props.readOnly }>

      {

        _.map @getOptions(), ( option, index )->=

          <div

            key={ index }

            className={ classed 'radigo', '-checked': option.selected }

            onClick={ _.partial @onClick, option }

            children={ option.label }

          />

        , this

      }

    </div>

  ##

##


module.exports = Radigos
