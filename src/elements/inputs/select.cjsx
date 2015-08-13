§require 'mixins/component'
§require 'mixins/collection_input'


Select = React.createClass

  displayName: 'Select'

  mixins: [ 'component', 'collection_input' ]

  classes:

    'select':
      '-readonly': ''

  onChange: ( event )->

    @setValue event.target.value

    event.target.blur()

    return

  render: ->

    <select
      {... @omitProps() }
      className={ @classed '', '-readonly': @props.readonly }
      value={ @getValue() }
      onChange={ @onChange }
    >
      {

        <option value='' /> if @props.allow_blank

      }
      {

        @mapOptions ( value, label )->

          <option
            key={ value }
            value={ value }
          >
            {

              label

            }
          </option>

      }
    </select>


§export Select
