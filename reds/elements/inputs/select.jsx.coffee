$require 'mixins/collection_input'
$require 'mixins/component'

$define ->


  Select = React.createClass

    mixins: [ 'component', 'collection_input' ]

    classes:
      'select': ''

    onChange: ( event )->

      @setValue event.target.value

      event.target.blur()

      return

    render: ->

      value = @getValue()

      options = @getOptions ( value, label )->

        `<option key={ value } value={ value }>{ label }</option>`

      options.unshift `<option key='_blank' value=''></option>` if @props.allow_blank

      `<select
        { ...this.omitProps() }
        className={ this.classes( 'Select' ) }
        value={ value }
        onChange={ this.onChange }
      >
        { options }
      </select>`
