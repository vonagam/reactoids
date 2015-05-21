$require 'mixins/component'
Autolinker = window.Autolinker

$define ->


  Text = React.createClass

    propTypes:

      text: React.PropTypes.string

    mixins: [ 'component' ]

    processText: ( text )->

      if ! text

        text = ''

      else

        text = Autolinker.link text
        text = '<p class="paragraph">' + text + '</p>'
        text = text.replace /\n{2,}/g, '</p><p class="paragraph">'
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
        className={ this.classes( 'Text' ) } 
        dangerouslySetInnerHTML={ { __html: this.text } }
      />`
