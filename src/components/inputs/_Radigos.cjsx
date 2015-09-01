require '../../mixins/component'
require '../../mixins/collection_input'


Radigos = React.createClass

  displayName: 'Radigos'

  mixins: [ 'component', 'collection_input' ]

  classes:

    'radigos':
      '-readonly': ''
      'radigo':
        '-checked': ''

  onClick: ( value )->

    current_value = @getValue()

    return if value == current_value && ! @props.allow_blank

    @setValue if value == current_value then undefined else value

    return

  render: ->

    current_value = @getValue()

    <div
      {... @omitProps() }
      className={ @classed '', '-readonly': @props.readonly }
    >
      {

        @mapOptions ( value, label )->

          <div
            key={ value }
            className={ @classed 'radigo', '-checked': value == current_value } 
            onClick={ @_partial @onClick, value }
          >
            { 

              label

            }
          </div>

      }
    </div>


module.exports = Radigos
