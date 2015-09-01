require '../../mixins/component'


HOST_REMOVING_REGEXP = RegExp( "^(?:https?:)?(?:\\/\\/)?" + window.location.host )


Link = React.createClass

  displayName: 'Link'

  mixins: [ 'component' ]

  classes:

    'link':
      '-current': ''
      '-disabled': ''

  propTypes:

    href: React.PropTypes.string
    current: React.PropTypes.bool

  render: ->

    href = @props.href

    if href

      l = window.location

      if href[ 0 ] == '?'

        path = l.search

      else if href[ 0 ] == '#'

        path = l.hash

      else

        href = href.replace HOST_REMOVING_REGEXP, ''

        path = l.pathname
        
        path += l.search || '?' if /\?/.test href

        path += l.hash || '#' if /#/.test href

      href = null if href == path || @props.current

    Tag = if href then 'a' else 'span'

    <Tag
      {... @omitProps() }
      className={ 

        @classed( '',

          '-current': @props.href && href == null
          '-disabled': ! @props.href

        )

      }
      href={ href }
    />


module.exports = Link
