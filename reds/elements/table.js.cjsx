$require 'mixins/component'


toProps = ( value )->

  return {} unless value

  return value if value.children

  return { children: value }


Table = React.createClass

  displayName: 'Table'

  mixins: [ 'component' ]

  classes: 

    'table':
      'head':
        'row': ''
        'cell': ''
      'body':
        'row': ''
        'cell': '' 
      'foot': ''

  propTypes:

    collection: React.PropTypes.array.isRequired
    columns: React.PropTypes.collection.isRequired
    tfoot: React.PropTypes.any
    tr: React.PropTypes.funced React.PropTypes.object

  render: ->

    ths = _.map @props.columns, ( column, key )->

      th = toProps _.funced column.th, column

      <th
        key={ key }
        {... th }
        className={ @mergeClassNames @classed( 'head.cell' ), th.className }
      />

    , this

    trs = _.map @props.collection, ( item, index )->

      tr = _.funced( @props.tr, item ) || {}

      <tr
        key={ index }
        {... tr }
        className={ @mergeClassNames @classed( 'body.row' ), tr.className }
      >
        {
        
          _.map @props.columns, ( column, key )->

            td = column.td

            if _.isString td

              td = { className: '-' + td,  hildren: item[ td ] }

            else

              td = toProps _.funced td, item, column

            <td 
              key={ key }
              {... td }
              className={ @mergeClassNames @classed( 'body.cell' ), td.className }
            />

          , this
        
        }
      </tr>

    , this

    <table
      {... @omitProps() }
      className={ @classed '' }
    >
      <thead className={ @classed 'head' }>
        <tr className={ @classed 'head.row' }>
          { 
            
            ths

          }
        </tr>
      </thead>
      <tbody className={ @classed 'body' }>
        {

          trs
        
        }
      </tbody>
      {

        if @props.tfoot

          <tfoot className={ @classed 'foot' }>{ @props.tfoot }</tfoot> 

      }
    </table>


$define -> Table
