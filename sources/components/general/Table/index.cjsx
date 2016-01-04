toProps = ( value )->=

  return {} if ! value

  return value if _.isPlainObject value

  return { children: value }


ComponentArgs = classes: 

  'table':
    'head':
      'row': ''
      'cell': ''
    'body':
      'row': ''
      'cell': '' 
    'foot': ''


Table = React.createClass

  displayName: 'Table'

  mixins: Mixin.resolve [ ComponentMixin( ComponentArgs ) ]

  propTypes:

    collection: React.PropTypes.array.isRequired
    columns: React.PropTypes.collection.isRequired
    tfoot: React.PropTypes.any
    tr: React.PropTypes.funced React.PropTypes.object

  render: ->=

    { props, classed } = this

    { collection, columns } = props

    <table
      {... @omitProps() }
      className={ classed '.' }
    >
      <thead className={ classed 'head' }>
        <tr className={ classed 'head.row' }>
          { 
            
            _.map columns, ( column, key )->=

              th = toProps _.funced column.th, column, key, columns

              <th
                key={ key }
                {... th }
                className={ @mergeClassNames classed( 'head.cell' ), th.className }
              />

            , this

          }
        </tr>
      </thead>
      <tbody className={ classed 'body' }>
        {

          _.map collection, ( item, index )->=

            tr = _.funced( props.tr, item, index, collection ) || {}

            <tr
              key={ index }
              {... tr }
              className={ @mergeClassNames classed( 'body.row' ), tr.className }
            >
              {
              
                _.map columns, ( column, key )->=

                  td = column.td

                  if _.isString td

                    td = { className: "-#{ _.camelCase td }", children: _.get item, td }

                  else

                    td = toProps _.funced td, item, column

                  <td
                    key={ key }
                    {... td }
                    className={ @mergeClassNames classed( 'body.cell' ), td.className }
                  />

                , this
              
              }
            </tr>

          , this
        
        }
      </tbody>
      {

        if props.tfoot

          <tfoot className={ classed 'foot' }>
            { 

              _.funced props.tfoot, 

            }
          </tfoot> 

      }
    </table>


module.exports = Table
