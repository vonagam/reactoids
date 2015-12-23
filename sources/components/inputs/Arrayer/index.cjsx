Mixin = requireSource 'various/Mixin'
ComponentMixin = requireSource 'mixins/Component'
StringedMixin = requireSource 'mixins/Stringed'
InputMixin = requireSource 'mixins/Input'
RenderSlotsMixin = requireSource 'mixins/RenderSlots'

Input = requireSource 'components/inputs/Input'
Button = requireSource 'components/general/Button'


Item = React.createClass

  displayName: 'Item'

  propTypes:

    value: React.PropTypes.any
    classed: React.PropTypes.func
    stringed: React.PropTypes.func
    onChange: React.PropTypes.func
    onRemove: React.PropTypes.func

  render: ->=

    { classed, stringed } = @props

    <div className={ classed 'item' }>
      <Input
        className={ classed 'input' }
        value={ @props.value }
        onChange={ @props.onChange }
      />
      <Button
        className={ classed 'remove' }
        onClick={ @props.onRemove }
        text={ stringed 'remove' }
      />
    </div>


ComponentArgs = classes:

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

StringedArgs = strings: [ 'remove', 'add', 'clear' ]

RenderSlotsArgs = names: [ 'item' ]


Arrayer = React.createClass

  displayName: 'Arrayer'

  mixins: Mixin.resolve [ ComponentMixin( ComponentArgs ), StringedMixin( StringedArgs ), InputMixin, RenderSlotsMixin( RenderSlotsArgs ) ]

  propTypes:

    template: React.PropTypes.funced React.PropTypes.any # ( that )->=
    canAdd: React.PropTypes.funced React.PropTypes.bool # ( value )->=
    canRemove: React.PropTypes.funced React.PropTypes.bool # ( item, value )->=

  getDefaultProps: ->=

    value: []
    template: ''
    canAdd: _.all
    canRemove: true
    renderItem: ( that, slotProps, userProps )->=

      <Item
        {... slotProps }
        {... userProps }
      />

  onItemChange: ( index, value )->

    values = _.clone @getValue()

    values[ index ] = value

    @setValue values

  onItemRemove: ( index )->

    values = _.clone @getValue()

    values.splice index, 1

    @setValue values

  onAddClick: ->

    values = _.clone @getValue()

    values.push _.cloneDeep _.funced @props.template, this

    @setValue values

  onClearClick: ->

    values = _.clone @getValue()

    values = _.reject values, ( ( item )->= _.funced @props.canRemove, item, values ), this

    @setValue values

  render: ->=

    value = @getValue()

    <div
      {... @omitProps() }
      className={ @classed '.', "-#{ if value.length > 0 then 'filled' else 'empty' }", '-readonly': @props.readOnly }
    >
      <div className={ @classed 'items' }>
        {

          _.map value, ( item, index )->=

            @renderItem(
            
              key: index
              value: item
              classed: @classed
              stringed: @stringed
              onChange: @_partial @onItemChange, index
              onRemove: _.funced( @props.canRemove, item, value ) && @_partial @onItemRemove, index
            
            )

          , this

        }
      </div>
      <div className={ @classed 'actions' }>
        <Button
          className={ @classed 'action', '-add' }
          onClick={ @onAddClick if _.funced @props.canAdd, value }
          text={ @stringed 'add' }
        />
        <Button
          className={ @classed 'action', '-clear' }
          onClick={ @onClearClick if _.any value, ( ( item )->= _.funced @props.canRemove, item, value ), this }
          text={ @stringed 'clear' }
        />
      </div>
    </div>


module.exports = Arrayer
