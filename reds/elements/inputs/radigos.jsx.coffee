classes = $require 'various/classes'
$require 'mixins/collection_input'
$require 'mixins/component'

$define ->


  Radigos = React.createClass

    mixins: [ 'component', 'collection_input' ]

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

        className = classes 'radigo', '-checked': value == ivalue

        `<div
          key={ value }
          data-value={ value }
          className={ className } 
          onClick={ this.onOptionClick }
        >
          { label }
        </div>`

      , this

      `<div
        { ...this.omitProps() }
        className={ this.classes( 'Radigos' ) }
      >
        { options }
      </div>`
