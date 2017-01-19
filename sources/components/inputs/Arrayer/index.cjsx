# mixins

StringedMixin = requireSource 'mixins/Stringed'

RenderSlotsMixin = requireSource 'mixins/RenderSlots'

# components

Input = requireSource 'components/inputs/Input'

Button = requireSource 'components/general/Button'


Item = React.createClass {

  propTypes: {

    'value': React.PropTypes.any

    'classed': React.PropTypes.func

    'stringed': React.PropTypes.func

    'onChange': React.PropTypes.func

    'onRemove': React.PropTypes.func

  }

  render: ->=

    { props } = this

    { classed, stringed } = props


    <div className={ classed 'item' }>

      <Input className={ classed 'input' } value={ props.value } onChange={ props.onChange } />

      <Button className={ classed 'remove' } onClick={ props.onRemove } children={ stringed 'remove' } />

    </div>

  ##

}


Arrayer = React.createClass {

  mixins: Mixin.resolve [

    ComponentMixin {

      classes: {

        '-readonly': ''
        '-filled': ''
        '-empty': ''
        'items':
          'item':
            'input': ''
            'remove': ''
        'actions':
          'action':
            '-add': ''
            '-clear': ''

      }

    }

    StringedMixin strings: [ 'remove', 'add', 'clear' ]

    InputMixin()

    RenderSlotsMixin names: [ 'item' ]

  ]

  propTypes: {

    'template': React.PropTypes.funced React.PropTypes.any # ( that )->=

    'canAdd': React.PropTypes.funced React.PropTypes.bool # ( value )->=

    'canRemove': React.PropTypes.funced React.PropTypes.bool # ( item, value )->=

  }

  getDefaultProps: ->=

    'value': []

    'template': ''

    'canAdd': _.every

    'canRemove': true

    'renderItem': ( that, slotProps, userProps )->=

      <Item {... slotProps } {... userProps } />

    ##

  ##

  onItemChange: ( index, value )->

    values = _.clone @getValue()

    values[ index ] = value

    @setValue values

  ##

  onItemRemove: ( index )->

    values = _.clone @getValue()

    values.splice index, 1

    @setValue values

  ##

  onAddClick: ->

    values = _.clone @getValue()

    values.push _.cloneDeep _.funced @props.template, this

    @setValue values

  ##

  onClearClick: ->

    values = _.clone @getValue()

    values = _.reject values, _.bind ( ( item )->= _.funced @props.canRemove, item, values ), this

    @setValue values

  ##

  render: ->=

    { props, classed, stringed } = this

    value = @getValue()


    <div

      {... @omitProps() }

      className={ classed '.', "-#{ if value.length > 0 then 'filled' else 'empty' }", '-readonly': props.readOnly }

    >

      <div className={ classed 'items' }>

        {

          _.map value, _.bind ( item, index )->=

            @renderItem(

              key: index

              value: item

              classed: classed

              stringed: stringed

              onChange: @_partial @onItemChange, index

              onRemove: _.funced( props.canRemove, item, value ) && @_partial @onItemRemove, index

            )

          , this

        }

      </div>

      <div className={ classed 'actions' }>

        <Button

          className={ classed 'action', '-add' }

          onClick={ @onAddClick if _.funced props.canAdd, value }

          children={ stringed 'add' }

        />

        <Button

          className={ classed 'action', '-clear' }

          onClick={ @onClearClick if _.any value, ( item )->= _.funced props.canRemove, item, value }

          children={ stringed 'clear' }

        />

      </div>

    </div>

  ##

}


module.exports = Arrayer
