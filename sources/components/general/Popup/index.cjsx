# dependencies

$ = requireDependency 'jquery' # jquery/jquery, http://jquery.com

# components

Layer = requireSource 'components/general/Layer'


updateBodyClassName = (->=

  bodyClassNames = {}

  bodyClassName = ''


  ( id, className )->

    return if bodyClassNames[ id ] == className


    if className

      bodyClassNames[ id ] = className

    else

      delete bodyClassNames[ id ]

    ##


    $body = $ 'body'

    $body.removeClass bodyClassName

    bodyClassName = _.values( bodyClassNames ).join ' '

    $body.addClass bodyClassName

  ##

)()


Popup = React.createClass {

  mixins: Mixin.resolve [

    ComponentMixin {

      classes: {

        'body': ''
        'layer': ''

      }

    }

  ]

  propTypes: {

    'layerProps': React.PropTypes.object

  }

  componentDidMount: ->

    @id = _.uniqueId()

    @updateBodyClassName @classed 'body'

  ##

  componentDidUpdate: ->

    @updateBodyClassName @classed 'body'

  ##

  componentWillUnmount: ->

    @updateBodyClassName null

  ##

  updateBodyClassName: ( className )->

    updateBodyClassName @id, className

  ##

  render: ->=

    { props, classed } = this


    <Layer {... props.layerProps } className={ classed 'layer' }>

      <div {... @omitProps() } className={ classed '.' } />

    </Layer>

  ##

}


module.exports = Popup
