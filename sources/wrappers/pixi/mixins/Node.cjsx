# mixins

BaseNodeMixin = requireSource 'various/CustomRender/mixins/Node'

BaseContainerArgs = requireSource 'wrappers/pixi/mixins/_BaseContainerArgs'


PROPS =

  'position': new PIXI.Point 0, 0
  'scale': new PIXI.Point 1, 1
  'pivot': new PIXI.Point 0, 0
  'skew': new PIXI.Point 0, 0
  'rotation': 0
  'alpha': 1
  'visible': true
  'renderable': true
  'filterArea': null
  'cacheAsBitmap': false

  'x': 0
  'y': 0
  'mask': null
  'filters': null

  'hitArea': null
  'interactive': false
  'buttonMode': false
  'interactiveChildren': true
  'defaultCursor': 'pointer'

##

EVENTS =

  _.transform( [

    'onRightDown'
    'onMouseDown'
    'onRightUp'
    'onMouseUp'
    'onRightClick'
    'onClick'
    'onRightUpOutside'
    'onMouseUpOutside'
    'onMouseMove'
    'onMouseOver'
    'onMouseOut'
    'onTouchStart'
    'onTouchEnd'
    'onTap'
    'onTouchEndOutside'
    'onTouchMove'

  ], ( result, event )->

    result[ event ] = event.replace( /^on/, '' ).toLowerCase()

  , {} )

##


undefnull = ( value )->= value == undefined || value == null


# Allow duplication of code in this instance because of perfomance gain

applyRootPixiProps = ( target, scheme, prev, next )->=

  changeIsMade = false

  for key of prev

    continue unless scheme.hasOwnProperty key

    if ! undefnull( prev[ key ] ) && undefnull( next[ key ] )

      target[ key ] = scheme[ key ]

      changeIsMade = true

    ##

  ##

  for key of next

    continue unless scheme.hasOwnProperty key

    if ! undefnull( next[ key ] ) && next[ key ] != prev[ key ]

      target[ key ] = next[ key ]

      changeIsMade = true

    ##

  ##

  changeIsMade

##

# This can be slightly rewritten, but let's keep them similar

applyEventPixiProps = ( target, scheme, prev, next )->=

  changeIsMade = false

  for key of prev

    continue unless scheme.hasOwnProperty key

    if ! undefnull( prev[ key ] ) && undefnull( next[ key ] )

      target.off scheme[ key ], prev[ key ]

      changeIsMade = true

    ##

  ##

  for key of next

    continue unless scheme.hasOwnProperty key

    if ! undefnull( next[ key ] ) && next[ key ] != prev[ key ]

      target.off scheme[ key ], prev[ key ] if prev[ key ]

      target.on scheme[ key ], next[ key ]

      changeIsMade = true

    ##

  ##

  changeIsMade

##

applyBasePixiProps = ( that, prevProps, nextProps )->

  applyRootPixiProps that.pixi, PROPS, prevProps, nextProps

  applyEventPixiProps that.pixi, EVENTS, prevProps, nextProps

##


mixin = Mixin.createArged

  args:

    createPixi: React.PropTypes.func # ( that, props )->=
    updatePixi: React.PropTypes.func # ( that, prevProps, nextProps )->

  ##

  mixins: [ BaseNodeMixin ]

  mixin: ( ARGS )->=

    BaseNodeArgs =

      nodeGet: ( that )->=

        that.pixi

      ##

      nodeCreate: ( that, props )->=

        that.pixi = ARGS.createPixi that, props

        that.pixi

      ##

      nodeUpdate: ( that, prevProps, nextProps )->

        applyBasePixiProps that, prevProps, nextProps

        ARGS.updatePixi that, prevProps, nextProps

      ##

      nodeDestroy: ( that )->

        that.pixi.destroy()

      ##

    ##


    mixins: [ BaseNodeMixin( _.assign {}, BaseContainerArgs, BaseNodeArgs ) ]

    applyRootPixiProps: applyRootPixiProps

  ##

##


module.exports = mixin
