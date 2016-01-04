getStateFromProps = ( props )->=

  processed: props.process props.source

##


Processed = React.createClass

  mixins: Mixin.resolve [ 

    ComponentMixin

      classes: {}

    ## 

  ]

  propTypes:

    'tag': React.PropTypes.any

    'source': React.PropTypes.any
    
    'process': React.PropTypes.func.isRequired

  ##

  getDefaultProps: ->=

    'tag': 'div'

  ##

  getInitialState: ->=

    getStateFromProps @props

  ##

  componentWillReceiveProps: ( nextProps )->

    unless _.isEqual( nextProps.source, @props.source ) && _.isEqual( nextProps.process, @props.process )

      @setState getStateFromProps nextProps

    ##

  ##

  render: ->=

    { props, state, classed } = this

    Tag = props.tag


    <Tag

      {... @omitProps() }
    
      className={ classed '.' } 
    
      dangerouslySetInnerHTML={ __html: state.processed }
    
    />

  ##

##


module.exports = Processed
