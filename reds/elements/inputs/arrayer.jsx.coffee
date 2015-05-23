Input = $require 'elements/inputs/input'
Button = $require 'elements/button'
$require 'mixins/input'
$require 'mixins/component'
$require 'mixins/omit_props'

$define ->


  Item = React.createClass

    propTypes:

      value: React.PropTypes.any
      onChange: React.PropTypes.func
      onRemove: React.PropTypes.func

    mixins: [ 'omit_props' ]

    render: ->

      props = @props

      `<div { ...this.omitProps() }>
        <Input
          className='input'
          value={ props.value }
          onChange={ props.onChange }
        />
        <Button
          className='remove'
          onClick={ props.onRemove }
          text='x'
        />
      </div>`


  Arrayer = React.createClass

    propTypes:

      item: React.PropTypes.any
      template: React.PropTypes.any
      canAdd: React.PropTypes.funced( React.PropTypes.bool )

    mixins: [ 'component', 'input' ]

    classes:
      'arrayer':
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


    getDefaultProps: ->

      item: Item
      template: ''
      canAdd: _.all
      value: []

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

      if is_filled

        items = _.map value, ( item, index )->

          `<this.props.item
            key={ index }
            className='item'
            value={ item }
            onChange={ _.partial( this.onItemChange, index ) }
            onRemove={ _.partial( this.onItemRemove, index ) }
          />`

        , this

      `<div
        { ...this.omitProps() }
        className={ this.classes( 'Arrayer', is_filled ? '-filled' : '-empty' ) }
      >
        <div className='items'>
          { items }
        </div>
        <div className='actions'>
          <Button
            className='action -add'
            onClick={ _.funced( this.props.canAdd, value ) ? this.onAddClick : undefined }
            text='Добавить'
          />
          <Button
            className='action -clear'
            onClick={ is_filled ? this.onClearClick : undefined }
            text='Очистить'
          />
        </div>
      </div>`
