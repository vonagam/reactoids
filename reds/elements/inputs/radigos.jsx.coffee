classes = $require 'various/classes'
$require 'mixins/collection_input'
$require 'mixins/component'

$define ->


  Radigos = React.createClass

    mixins: [ 'component', 'collection_input' ]

    classes:
      'radigos':
        'radigo':
          '-checked': ''

    onOptionClick: ( event )->

      value = @getValue()

      option = event.target.getAttribute 'data-value'

      if option == value.toString()

        return unless @props.allow_blank

        option = null

      @setValue option

      return

    render: ->

      ivalue = @getValue()

      options = @getOptions ( value, label )->

        className = @classed '.radigo', '.radigo.-checked': value == ivalue

        `<div
          key={ value }
          data-value={ value }
          className={ className } 
          onClick={ this.onOptionClick }
        >
          { label }
        </div>`

      `<div
        { ...this.omitProps() }
        className={ this.classed( '' ) }
      >
        { options }
      </div>`
