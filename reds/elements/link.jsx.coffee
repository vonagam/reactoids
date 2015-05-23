$require 'mixins/component'

$define ->


  host_removing_regexp = RegExp( "^(?:https?:)?(?:\\/\\/)?" + window.location.host )


  Link = React.createClass

    propTypes:

      href: React.PropTypes.string
      current: React.PropTypes.bool

    mixins: [ 'component' ]

    classes:
      'link':
        '-current': ''
        '-disabled': ''

    render: ->

      href = @props.href

      if href

        l = window.location

        if href[ 0 ] == '?'

          path = l.search

        else if href[ 0 ] == '#'

          path = l.hash

        else

          href = href.replace host_removing_regexp, ''

          path = l.pathname
          
          path += l.search || '?' if /\?/.test href

          path += l.hash || '#' if /#/.test href

        href = null if href == path || @props.current

      className = @classes 'Link',
        '-current': @props.href && href == null
        '-disabled': ! @props.href

      Tag = if href then 'a' else 'span'

      `<Tag
        { ...this.omitProps() }
        className={ className }
        href={ href }
      />`

