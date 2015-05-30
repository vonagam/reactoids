$require 'mixins/component'

$define ->


  toProps = ( value )->

    return {} unless value

    return { children: value } unless value.children

    return value


  Table = React.createClass

    mixins: [ 'component' ]

    propTypes:

      collection: React.PropTypes.array.isRequired
      columns: React.PropTypes.oneOfType( [ React.PropTypes.array, React.PropTypes.object ] ).isRequired
      tfoot: React.PropTypes.any
      tr: React.PropTypes.funced( React.PropTypes.object )

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
          className={ this.mergeClassNames( this.classed( 'head.cell' ), th.className ) }
        />`

      , this

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
            className={ this.mergeClassNames( this.classed( 'body.cell' ), td.className ) }
          />`

        , this

        tr = _.funced( @props.tr, item ) || {}

        `<tr
          key={ index }
          { ...tr }
          className={ this.mergeClassNames( this.classed( 'body.row' ), tr.className ) }
        >
          { tds }
        </tr>`

      , this

      if @props.tfoot

        tfoot = `<tfoot className={ this.classed( 'foot' ) }>{ this.props.tfoot }</tfoot>`

      `<table
        { ...this.omitProps() }
        className={ this.classed( '' ) }
      >
        <thead className={ this.classed( 'head' ) }>
          <tr className={ this.classed( 'head.row' ) }>
            { ths }
          </tr>
        </thead>
        <tbody className={ this.classed( 'body' ) }>
          { trs }
        </tbody>
        { tfoot }
      </table>`
