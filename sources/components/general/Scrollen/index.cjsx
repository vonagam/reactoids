$ = requireDependency 'jquery'

Mixin = requireSource 'various/Mixin'
ComponentMixin = requireSource 'mixins/Component'
TimerMixin = requireSource 'mixins/Timer'

Button = requireSource 'components/general/Button'


isShownInContainer = ( $container, nodeTop, nodeBottom )->=

  if $container[ 0 ] == window || $container[ 0 ].offsetHeight != $container[ 0 ].scrollHeight

    containerScroll = $container.scrollTop()

    containerHeight = $container.height()

    containerTop = _.get $container.offset(), 'top', 0

    nodeLocalTop = nodeTop - containerTop

    nodeLocalBottom = nodeBottom - containerTop

    return false if containerScroll > nodeLocalTop || containerScroll + containerHeight < nodeLocalTop

    return false if containerScroll > nodeLocalBottom || containerScroll + containerHeight < nodeLocalBottom

  return true if $container[ 0 ] == window || $container[ 0 ] == document.body

  return isShownInContainer $container.parent(), nodeTop, nodeBottom

isShown = ( that )->=

  $node = $ that.dom()

  nodeTop = $node.offset().top

  nodeBottom = nodeTop + $node[ 0 ].offsetHeight

  return false unless isShownInContainer $( window ), nodeTop, nodeBottom

  return isShownInContainer $node.parent(), nodeTop, nodeBottom

isVisible = ( that )->=

  $node = $ that.dom()

  return false unless $node.is ':visible'

  return $node.parents().filter(

    ( index, element )->= $( element ).css( 'opacity' ) == '0' || $( element ).css( 'visibility' ) == 'hidden'

  ).length == 0

doScrollenCheck = ( that )->

  beforeVisible = that.visible
  beforeShown = that.shown

  afterVisible = isVisible that
  afterShown = afterVisible && isShown that

  that.visible = afterVisible
  that.shown = afterShown

  if beforeVisible == true && beforeShown == false && afterShown == true

    $( that.dom() ).trigger 'click'


ComponentArgs =

  classes:

    {}


Scrollen = React.createClass

  displayName: 'Scrollen'

  mixins: Mixin.resolve [ ComponentMixin( ComponentArgs ), TimerMixin ]

  propTypes:

    tag: React.PropTypes.any

  getDefaultProps: ->=

    tag: Button

  getInitialMembers: ->=

    visible: false
    shown: false

  componentDidMount: ->

    doScrollenCheck this

    setInterval 'checks', doScrollenCheck, 100, this

  render: ->=

    { props, classed } = this

    Tag = props.tag

    <Tag
      {... @omitProps() }
      className={ classed '.' }
    />


module.exports = Scrollen
