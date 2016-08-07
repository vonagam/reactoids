# various

createNode = requireSource 'wrappers/pixi/helpers/createNode'


PROPS =

  'width': 0
  'height': 0

##


Container = createNode 'Container',

  createPixi: ( that, props )->=

    new PIXI.Container()

  ##

  updatePixi: ( that, prevProps, nextProps )->

    that.applyRootPixiProps that.pixi, PROPS, prevProps, nextProps

  ##

##


module.exports = Container
