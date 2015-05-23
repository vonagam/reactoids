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

    classes: 
      'table': 
        'head':
          'row': ''
          'cell': ''
        'body':
          'row': ''
          'cell': '' 
        'foot': ''

    getDefaultProps: ->

      tr_props: {}

    render: ->

      ths = _.map @props.columns, ( column, key )->

        th = toProps _.funced column.th, column

        `<th
          key={ key }
          { ...th }
          className={ classes( this.classed( '.head.cell' ), th.className ) }
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
            className={ classes( this.classed( '.body.cell' ), td.className ) }
          />`

        tr = _.funced( @props.tr, item ) || {}

        `<tr
          key={ index }
          { ...tr }
          className={ classes( this.classed( '.body.row' ), tr.className ) }
        >
          { tds }
        </tr>`

      , this

      if @props.tfoot

        tfoot = `<tfoot className={ this.classed( '.foot' ) }>{ this.props.tfoot }</tfoot>`

      `<table
        { ...this.omitProps() }
        className={ this.classed( '' ) }
      >
        <thead className={ this.classed( '.head' ) }>
          <tr className={ this.classed( '.head.row' ) }>
            { ths }
          </tr>
        </thead>
        <tbody className={ this.classed( '.body' ) }>
          { trs }
        </tbody>
        { tfoot }
      </table>`
