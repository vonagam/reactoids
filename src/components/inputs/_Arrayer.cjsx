require '../../mixins/component'
require '../../mixins/input'
require '../../mixins/slots'

Input = require '../elements/inputs/input'
Button = require '../elements/button'


Item = React.createClass

  displayName: 'Item'

  propTypes:

    value: React.PropTypes.any
    classed: React.PropTypes.func
    onChange: React.PropTypes.func
    onRemove: React.PropTypes.func

  render: ->

    classed = @props.classed

    <div className={ classed 'item' }>
      <Input
        className={ classed 'input' }
        value={ @props.value }
        onChange={ @props.onChange }
      />
      <Button
        className={ classed 'remove' }
        onClick={ @props.onRemove }
        text='x'
      />
    </div>


Arrayer = React.createClass

  displayName: 'Arrayer'

  mixins: [ 'component', 'input', 'slots( "item" )' ]

  classes:

    'arrayer':
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

  propTypes:

    template: React.PropTypes.any
    canAdd: React.PropTypes.funced React.PropTypes.bool

  getDefaultProps: ->

    template: ''
    canAdd: _.all
    value: []
    renderItem: ( arrayer, slot_props, user_props )->

      <Item
        {... slot_props }
        {... user_props }
      />

  onItemChange: ( index, value )->

    values = _.clone @getValue()

    values[ index ] = value

    @setValue values

    return

  onItemRemove: ( index )->

    values = _.clone @getValue()

    values.splice index, 1

    @setValue values

    return

  onAddClick: ->

    values = _.clone @getValue()

    values.push _.cloneDeep @props.template

    @setValue values

    return

  onClearClick: ->

    @setValue []

    return

  render: ->

    value = @getValue()

    is_filled = value && value.length > 0

    <div
      {... @omitProps() }
      className={ @classed '', "-#{ if is_filled then 'filled' else 'empty' }", '-readonly': @props.readonly }
    >
      <div className={ @classed 'items' }>
        {

          if is_filled

            _.map value, ( item, index )->

              @item(
              
                key: index
                value: item
                classed: @classed
                onChange: @_partial @onItemChange, index
                onRemove: @_partial @onItemRemove, index
              
              )

            , this

        }
      </div>
      <div className={ @classe 'actions' }>
        <Button
          className={ @classed 'action', '-add' }
          onClick={ @onAddClick if _.funced @props.canAdd, value }
          text='Add'
        />
        <Button
          className={ @classed 'action', '-clear' }
          onClick={ @onClearClick if is_filled }
          text='Clear'
        />
      </div>
    </div>


module.exports = Arrayer
