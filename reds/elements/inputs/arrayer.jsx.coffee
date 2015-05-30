Input = $require 'elements/inputs/input'
Button = $require 'elements/button'
$require 'mixins/input'
$require 'mixins/component'
$require 'mixins/omit_props'

$define ->


  Item = React.createClass

    mixins: [ 'omit_props' ]

    propTypes:

      value: React.PropTypes.any
      onChange: React.PropTypes.func
      onRemove: React.PropTypes.func
      classed: React.PropTypes.func

    render: ->

      props = @props

      classed = props.classed

      `<div className={ classed( 'item' ) }>
        <Input
          className={ classed( 'input' ) }
          value={ props.value }
          onChange={ props.onChange }
        />
        <Button
          className={ classed( 'remove' ) }
          onClick={ props.onRemove }
          text='x'
        />
      </div>`


  Arrayer = React.createClass

    mixins: [ 'component', 'input' ]

    propTypes:

      item: React.PropTypes.any
      template: React.PropTypes.any
      canAdd: React.PropTypes.funced( React.PropTypes.bool )

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
            value={ item }
            onChange={ _.partial( this.onItemChange, index ) }
            onRemove={ _.partial( this.onItemRemove, index ) }
            classed={ this.classed }
          />`

        , this

      `<div
        { ...this.omitProps() }
        className={ this.classed( '', is_filled ? '-filled' : '-empty' ) }
      >
        <div className={ this.classed( 'items' ) }>
          { items }
        </div>
        <div className={ this.classed( 'actions' ) }>
          <Button
            className={ this.classed( 'action', '-add' ) }
            onClick={ _.funced( this.props.canAdd, value ) ? this.onAddClick : undefined }
            text='Add'
          />
          <Button
            className={ this.classed( 'action', '-clear' ) }
            onClick={ is_filled ? this.onClearClick : undefined }
            text='Clear'
          />
        </div>
      </div>`
