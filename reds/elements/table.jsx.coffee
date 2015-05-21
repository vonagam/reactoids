classes = $require 'various/classes'
$require 'mixins/component'

$define ->


  toProps = ( value )->

    return {} unless value

    return { children: value } unless value.children

    return value


  Table = React.createClass

    propTypes:

      collection: React.PropTypes.array.isRequired
      columns: React.PropTypes.oneOfType( [ React.PropTypes.array, React.PropTypes.object ] ).isRequired
      tfoot: React.PropTypes.any
      tr: React.PropTypes.funced( React.PropTypes.object )

    mixins: [ 'component' ]

    getDefaultProps: ->

      tr_props: {}

    render: ->

      ths = _.map @props.columns, ( column, key )->

        th = toProps _.funced column.th, column

        `<th
          key={ key }
          { ...th }
          className={ classes( 'th', th.className ) }
        />`

      trs = _.map @props.collection, ( item, index )->

        tds = _.map @props.columns, ( column, key )->

          td = column.td

          if _.isString td

            td = { className: '-' + td, children: item[ td ] }

          else

            td = toProps _.funced column.td, item, column

          `<td 
            key={ key }
            { ...td }
            className={ classes( 'td', td.className ) }
          />`

        tr = _.funced( @props.tr, item ) || {}

        `<tr
          key={ index }
          { ...tr }
          className={ classes( 'tr', tr.className ) }
        >
          { tds }
        </tr>`

      , this

      tfoot = `<tfoot className='tfoot'>{ this.props.tfoot }</tfoot>` if @props.tfoot

      `<table
        { ...this.omitProps() }
        className={ this.classes( 'Table' ) }
      >
        <thead className='thead'><tr className='thead_tr'>{ ths }</tr></thead>
        <tbody className='tbody'>{ trs }</tbody>
        { tfoot }
      </table>`
