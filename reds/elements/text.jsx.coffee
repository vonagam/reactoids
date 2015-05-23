$require 'mixins/component'
Autolinker = window.Autolinker

$define ->


  Text = React.createClass

    propTypes:

      text: React.PropTypes.string

    mixins: [ 'component' ]

    classes_scheme:
      'text': 
        'paragraph': ''

    processText: ( text )->

      if ! text

        text = ''

      else

        className = @classed 'text.paragraph'

        text = Autolinker.link text
        text = '<p class="' + className + '">' + text + '</p>'
        text = text.replace /\n{2,}/g, '</p><p class="' + className + '">'
        text = text.replace /\n/g, '<br/>'

      @text = text

      return

    componentWillReceiveProps: ( next_props )->

      @processText @props.text if next_props.text == @props.text

      return

    componentWillMount: ->

      @processText @props.text

      return

    render: ->

      `<div
        { ...this.omitProps() }
        className={ this.classed( 'text' ) } 
        dangerouslySetInnerHTML={ { __html: this.text } }
      />`
