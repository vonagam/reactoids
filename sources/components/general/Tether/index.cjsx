# dependencies

Tether = requireDependency 'tether' # hubspot/tether, http://tether.io


getOptions = ( that, tether )->=

  options = _.clone that.props.tether

  options.element = if tether then tether.element else that.dom()

  options

##


# Cleaning Up After Tether https://github.com/HubSpot/tether/issues/36

STYLES = _.transform(

  [ 'transform', 'webkitTransform', 'OTransform', 'MozTransform', 'msTransform', 'position', 'top', 'bottom', 'left', 'right' ]

  ( ( result, key )-> result[ key ] = '' ), {}

)

getClassName = ( node )->=

  if node.className instanceof SVGAnimatedString

    node.className.baseVal

  else

    node.className

  ##

##

setClassName = ( node, className )->

  if className

    node.setAttribute 'class', className

  else

    node.removeAttribute 'class'

  ##

##

cleanUpTether = ( node, isElement )->

  className = getClassName node

  className = className.replace /(^|\s+)tether-\S+/g, ''

  setClassName node, className

  _.assign node.style, STYLES if isElement

##


Tether = React.createClass {

  mixins: Mixin.resolve [

    ComponentMixin()

  ]

  propTypes: {

    'enabled': React.PropTypes.bool

    'tether': React.PropTypes.shape {

      'target': React.PropTypes.any # DOM node, jQuery element, selector string

      'attachment': React.PropTypes.string # 'vert-attachment horiz-attachment' %w( top middle bottom ) %w( left center right )

      'targetAttachment': React.PropTypes.string

      'offset': React.PropTypes.string # 'vert-offset horiz-offset'

      'targetOffset': React.PropTypes.string

      'targetModifier': React.PropTypes.oneOf [ 'visible', 'scroll-handle' ]

      'optimizations': React.PropTypes.shape {

        'moveElemen': React.PropTypes.bool

        'gpu': React.PropTypes.bool

      }

      'constraints': React.PropTypes.arrayOf React.PropTypes.shape {

        'to': React.PropTypes.any # A DOM node, bounding box, the string 'window', or the string 'scrollParent'

        'pin': React.PropTypes.oneOfType [ React.PropTypes.bool, React.PropTypes.arrayOf React.PropTypes.string ]

        'attachment': React.PropTypes.string # 'vert-modifier horiz-modifier' %w( none together element target both )

      }

      'addTargetClasses': React.PropTypes.bool

    }

  }

  componentDidMount: ->

    return if @props.enabled == false

    options = getOptions this

    @createTether options

    @positionTether()

  ##

  componentDidUpdate: ( prevProps )->

    unless _.isEqual prevProps.tether, @props.tether

      return @destroyTether() if @props.enabled == false

      options = getOptions this, @tether

      if ! @tether

        @createTether options

      else

        @tether.setOptions options

        if @tether.target != @target

          cleanUpTether @target

          @target = @tether.target

        ##

      ##

    ##

    @positionTether()

  ##

  componentWillUnmount: ->

    @destroyTether()

  ##

  createTether: ( options )->

    @tether = new Tether options

    @target = @tether.target

  ##

  destroyTether: ->

    return unless @tether

    cleanUpTether @tether.target

    cleanUpTether @tether.element, true

    @tether.destroy()

    @tether = undefined

    @target = undefined

  ##

  positionTether: ->

    @tether.position() if @tether

  ##

  render: ->=

    { classed } = this


    <div {... @omitProps() } className={ classed '.' } />

  ##

}


module.exports = Tether
