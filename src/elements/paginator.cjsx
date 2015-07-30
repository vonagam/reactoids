§require 'mixins/component'

SearchParams = §require 'various/search_params'


Paginator = React.createClass

  displayName: 'Paginator'

  mixins: [ 'component' ]

  classes:
    
    'paginator':
      'separator': ''
      'page':
        '-current': ''

  propTypes:

    current: React.PropTypes.number.isRequired
    total: React.PropTypes.number.isRequired
    size: React.PropTypes.number.isRequired
    url: React.PropTypes.funced React.PropTypes.string
    param: React.PropTypes.string
    search: React.PropTypes.object

  getDefaultProps: ->

    url: ''
    param: 'page'
    size: 7

  getPageUrl: ( page )->

    if _.isFunction @props.url

      @props.url page

    else

      @props.url + SearchParams.encode _.merge {}, @props.search, "#{ @props.param }": page

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

    <div
      {... @omitProps() }
      className={ @classed '' }
    >
      { 

        _.map items, ( item, index )->

          if item == undefined

            <div 
              key={ 's' + index }
              className={ @classed 'separator' }
            />

          else

            page = item + 1
            page_is_current = page == @props.current

            <a
              key={ page }
              className={ @classed 'page', '-current': page_is_current }
              href={ if page_is_current then null else @getPageUrl page }
            >
              { page }
            </a>

        , this

      }
    </div>


§export Paginator
