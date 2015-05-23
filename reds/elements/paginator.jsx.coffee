SearchParams = $require 'various/search_params'
$require 'mixins/component'

$define ->


  Paginator = React.createClass

    propTypes:

      current: React.PropTypes.number.isRequired
      total: React.PropTypes.number.isRequired
      size: React.PropTypes.number.isRequired
      url: React.PropTypes.oneOfType [ React.PropTypes.string, React.PropTypes.func ]
      param: React.PropTypes.string
      search: React.PropTypes.object

    mixins: [ 'component' ]

    classes:
      'paginator':
        'separator': ''
        'page':
          '-current': ''

    getDefaultProps: ->

      url: ''
      param: 'page'
      size: 7

    getPageUrl: ( page )->

      @props.url + SearchParams.encode _.merge {}, @props.search, "#{ @props.param }": page

    mapItem: ( item, index )->

      return `<div key={ 's' + index } className='separator' />` if item == undefined

      url = @props.url

      page = item + 1

      className = 'page'

      href = ( if _.isFunction @props.url then @props.url else @getPageUrl ) page

      if page == @props.current

        className += ' -current'
        href = undefined

      `<a
        key={ page }
        className={ className }
        href={ href }
      >
        { page }
      </a>`

    render: ->

      current = @props.current - 1
      total = @props.total
      size = @props.size

      items = []

      if total <= size

        _.append items, _.range total

      else

        factor = ( size - 3 ) / 2

        side = Math.ceil factor / 2
        near = Math.floor factor / 2

        if current <= factor + 1

          _.append items, _.range 0, factor + near + 2

          items.push undefined

          _.append items, _.range total - side, total

        else if current >= total - factor - 2

          _.append items, _.range 0, side

          items.push undefined

          _.append items, _.range total - ( factor + near + 2 ), total

        else

          _.append items, _.range 0, side

          items.push undefined

          _.append items, _.range current - near, current + near + 1

          items.push undefined

          _.append items, _.range total - side, total

      elements = _.map items, @mapItem

      `<div
        { ...this.omitProps() }
        className={ this.classes( 'Paginator' ) }
      >
        { elements }
      </div>`
