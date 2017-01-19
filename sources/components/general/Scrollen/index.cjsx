# dependencies

$ = requireDependency 'jquery' # jquery/jquery, http://jquery.com

Window = requireWindow 'window' # https://developer.mozilla.org/en-US/docs/Web/API/Window

# mixins

TimerMixin = requireSource 'mixins/Timer'


isShownInContainer = ( $container, nodeTop, nodeBottom )->=

  if $container[ 0 ] == Window || $container[ 0 ].offsetHeight != $container[ 0 ].scrollHeight

    containerScroll = $container.scrollTop()

    containerHeight = $container.height()

    containerTop = _.get $container.offset(), 'top', 0

    nodeLocalTop = nodeTop - containerTop

    nodeLocalBottom = nodeBottom - containerTop

    return false if containerScroll > nodeLocalTop || containerScroll + containerHeight < nodeLocalTop

    return false if containerScroll > nodeLocalBottom || containerScroll + containerHeight < nodeLocalBottom

  ##

  return true if $container[ 0 ] == Window || $container[ 0 ] == document.body

  return isShownInContainer $container.parent(), nodeTop, nodeBottom

##

isShown = ( that )->=

  $node = $ that.dom()

  nodeTop = $node.offset().top

  nodeBottom = nodeTop + $node[ 0 ].offsetHeight

  return false unless isShownInContainer $( Window ), nodeTop, nodeBottom

  return isShownInContainer $node.parent(), nodeTop, nodeBottom

##

isVisible = ( that )->=

  $node = $ that.dom()

  return false unless $node.is ':visible'

  return $node.parents().filter(

    ( index, element )->= $( element ).css( 'opacity' ) == '0' || $( element ).css( 'visibility' ) == 'hidden'

  ).length == 0

##

doScrollenCheck = ( that )->

  beforeVisible = that.visible
  beforeShown = that.shown

  afterVisible = isVisible that
  afterShown = afterVisible && isShown that

  that.visible = afterVisible
  that.shown = afterShown

  if beforeVisible == true && beforeShown == false && afterShown == true

    that.props.onReveal that

  ##

##


Scrollen = React.createClass {

  mixins: Mixin.resolve [

    ComponentMixin()

    TimerMixin()

  ]

  propTypes: {

    'onReveal': React.PropTypes.func.isRequired # ( that )->

  }

  getInitialMembers: ->=

    'visible': false

    'shown': false

  ##

  componentDidMount: ->

    doScrollenCheck this

    @setInterval 'checks', doScrollenCheck, 100, this

  ##

  render: ->=

    { props, classed } = this


    <div {... @omitProps() } className={ classed '.' } />

  ##

}


module.exports = Scrollen
