§require 'mixins/component'


Image = React.createClass

  displayName: 'Image'

  mixins: [ 'component' ]

  classes:
    
    'image': ''

  propTypes:

    tag: React.PropTypes.string
    url: React.PropTypes.string

  getDefaultProps: ->

    tag: 'img'

  render: ->

    Tag = @props.tag

    url = @props.url

    if url

      style =

        if Tag == 'img'

          { src: url } 

        else

          { style: { backgroundImage: "url(#{ url })" } }

    <Tag
      {... @omitProps() }
      {... style }
      className={ @classed '' }
    />


§export Image
