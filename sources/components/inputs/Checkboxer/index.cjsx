# mixins

InputMixin = requireSource 'mixins/Input'


Checkboxer = React.createClass

  mixins: Mixin.resolve [ 

    ComponentMixin

      classes:

        '-readonly': ''
        '-checked': ''

      ##

    ##

    InputMixin

  ]

  propTypes:

    onClick: React.PropTypes.func

  ##

  onClick: ->

    @setValue ! Boolean @getValue()

  ##

  onLabelClick: ->

    @onClick()

  ##

  render: ->=

    { props, classed } = this


    <div

      {... @omitProps() }

      className={ classed '.', '-checked': @getValue(), '-readonly': props.readOnly }

      onClick={ _.queue @onClick, props.onClick }

    />

  ##

##


module.exports = Checkboxer
