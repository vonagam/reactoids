$require 'mixins/component'

$define ->


  Image = React.createClass

    mixins: [ 'component' ]

    propTypes:

      tag: React.PropTypes.string
      url: React.PropTypes.string

    classes:
      'image': ''

    getDefaultProps: ->

      tag: 'img'

    render: ->

      Tag = @props.tag

      url = @props.url

      if url

        props = if Tag == 'img' then src: url else style: { backgroundImage: "url(#{ url })" }

      `<Tag
        { ...this.omitProps() }
        { ...props }
        className={ this.classed( '' ) }
      />`
