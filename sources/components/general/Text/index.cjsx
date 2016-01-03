ComponentMixin = requireSource 'mixins/Component'

Processed = requireSource 'components/general/Processed'


ComponentArgs = classes:
  
  'paragraph': ''


Text = React.createClass

  displayName: 'Text'

  mixins: Mixin.resolve [ ComponentMixin( ComponentArgs ) ]

  propTypes:

    text: React.PropTypes.string
    preProcess: React.PropTypes.func
    postProcess: React.PropTypes.func

  processText: ( text )->=

    return '' unless text

    className = @classed 'paragraph'

    text = @props.preProcess text if @props.preProcess

    text = '<p class="' + className + '">' + text + '</p>'
    text = text.replace /\n{2,}/g, '</p><p class="' + className + '">'
    text = text.replace /\n/g, '<br/>'

    text = @props.postProcess text if @props.postProcess

    text

  render: ->=

    { props, classed } = this

    <Processed
      {... @omitProps() }
      className={ classed '.' } 
      source={ props.text }
      process={ @processText }
    />


module.exports = Text
