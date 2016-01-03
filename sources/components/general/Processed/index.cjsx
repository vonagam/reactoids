ComponentMixin = requireSource 'mixins/Component'


ComponentArgs = classes:
  
  {}


doProcessing = ( props )->=

  processed: props.process props.source


Processed = React.createClass

  displayName: 'Processed'

  mixins: Mixin.resolve [ ComponentMixin( ComponentArgs ) ]

  propTypes:

    tag: React.PropTypes.any
    source: React.PropTypes.any
    process: React.PropTypes.func.isRequired

  getDefaultProps: ->=

    tag: 'div'

  getInitialState: ->=

    doProcessing @props

  componentWillReceiveProps: ( nextProps )->

    unless _.isEqual( nextProps.source, @props.source ) && _.isEqual( nextProps.process, @props.process )

      @setState doProcessing nextProps

  render: ->=

    { props, state, classed } = this

    Tag = props.tag

    <Tag
      {... @omitProps() }
      className={ classed '.' } 
      dangerouslySetInnerHTML={ __html: state.processed }
    />


module.exports = Processed
