# mixins

RenderSlotsMixin = requireSource 'mixins/RenderSlots'


toProps = ( value )->=

  return {} unless _.isExist value

  return value if _.isPlainObject value

  return { children: value }

##


Table = React.createClass {

  mixins: Mixin.resolve [

    ComponentMixin {

      classes: {

        'head':
          'row': ''
          'cell': ''
        'body':
          'row': ''
          'cell': ''
        'foot':
          'row': ''
          'cell': ''

      }

    }

    RenderSlotsMixin names: [ 'head', 'body', 'foot' ]

  ]

  propTypes: {

    'collection': React.PropTypes.collection.isRequired

    'columns': React.PropTypes.collection.isRequired

    'tr': React.PropTypes.funced React.PropTypes.object # ( item, itemKey, collection, columns )->= trProps

  }

  getDefaultProps: ->=

    'renderHead': ( that, slotProps, userProps )->=

      { classed } = that

      { columns } = slotProps


      return unless _.some columns, 'th'


      <thead className={ classed 'head' }>

        <tr className={ classed 'head.row' }>

          {

            _.map columns, _.bind ( column, key )->=

              th = toProps _.funced column.th, column, key


              <th key={ key } {... th } className={ @mergeClassNames classed( 'head.cell' ), th.className } />

            , that

          }

        </tr>

      </thead>

    ##

    'renderBody': ( that, slotProps, userProps )->=

      { classed, props } = that

      { collection } = props

      { columns } = slotProps


      <tbody className={ classed 'body' }>

        {

          _.map collection, _.bind ( item, itemKey )->=

            tr = toProps _.funced props.tr, item, itemKey, collection, columns


            <tr key={ itemKey } {... tr } className={ @mergeClassNames classed( 'body.row' ), tr.className }>

              {

                _.map columns, _.bind ( column, columnKey )->=

                  td = column.td

                  if _.isString td

                    td = { children: _.get item, td }

                  else

                    td = toProps _.funced td, item, itemKey, column, columnKey

                  ##


                  <td key={ columnKey } {... td } className={ @mergeClassNames classed( 'body.cell' ), td.className } />

                , that

              }

            </tr>

          , that

        }

      </tbody>

    ##

    'renderFoot': ( that, slotProps, userProps )->=

      { classed } = that

      { columns } = slotProps


      return unless _.some columns, 'tf'


      <tfoot className={ classed 'foot' }>

        <tr className={ classed 'foot.row' }>

          {

            _.map columns, _.bind ( column, key )->=

              tf = toProps _.funced column.tf, column, key


              <td key={ key } {... tf } className={ @mergeClassNames classed( 'foot.cell' ), tf.className } />

            , that

          }

        </tr>

      </tfoot>

    ##

  ##

  render: ->=

    { props, classed } = this

    { collection, columns } = props


    columns = _.transform columns, ( columns, column, key )->

      columns[ key ] = _.funced column, collection, key

    ##


    <table {... @omitProps() } className={ classed '.' }>

      { @renderHead columns: columns }

      { @renderBody columns: columns }

      { @renderFoot columns: columns }

    </table>

  ##

}


module.exports = Table
