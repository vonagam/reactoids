#§global 'Autolinker', 'https://github.com/gregjacobs/Autolinker.js'

require '../../mixins/component'


Text = React.createClass

  displayName: 'Text'

  mixins: [ 'component' ]

  classes:

    'text': 
      'paragraph': ''

  propTypes:

    text: React.PropTypes.string

  getInitialState: ->

    text: @processText @props.text

  processText: ( text )->

    return '' unless text

    className = @classed 'paragraph'

    text = Autolinker.link text
    text = '<p class="' + className + '">' + text + '</p>'
    text = text.replace /\n{2,}/g, '</p><p class="' + className + '">'
    text = text.replace /\n/g, '<br/>'

    text

  componentWillReceiveProps: ( next_props )->

    return if next_props.text == @props.text

    @setState text: @processText next_props.text

    return

  render: ->

    <div
      {... @omitProps() }
      className={ @classed '' } 
      dangerouslySetInnerHTML={ __html: @state.text }
    />


module.exports = Text
