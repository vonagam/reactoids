$require 'mixins/component'

$define ->


  Image = React.createClass

    propTypes:

      tag: React.PropTypes.string
      url: React.PropTypes.string

    mixins: [ 'component' ]

    render: ->

      Tag = @props.tag || 'img'

      url = @props.url

      if url

        props = if Tag == 'img' then src: url else style: { backgroundImage: "url(#{ url })" }

      `<Tag
        { ...this.omitProps() }
        { ...props }
        className={ this.classes( 'Image' ) }
      />`
