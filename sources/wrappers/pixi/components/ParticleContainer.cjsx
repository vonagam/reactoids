# various

createNode = requireSource 'wrappers/pixi/helpers/createNode'


PROPS =

  'width': 0
  'height': 0
  'interactiveChildren': false
  'blendMode': PIXI.BLEND_MODES.NORMAL
  'roundPixels': true

##

PROPERTIES =

  'do_scale': false
  'do_position': true
  'do_rotation': false
  'do_uvs': false
  'do_alpha': false

##


ParticleContainer = createNode 'ParticleContainer',

  createPixi: ( that, props )->=

    result = new PIXI.ParticleContainer

    result._r_properties = _.clone PROPERTIES

    result

  ##

  updatePixi: ( that, prevProps, nextProps )->

    that.applyRootPixiProps that.pixi, PROPS, prevProps, nextProps

    if that.applyRootPixiProps that.pixi._r_properties, PROPERTIES, prevProps, nextProps

      that.pixi._properties = _.values that.pixi._r_properties

    ##

  ##

##


module.exports = ParticleContainer
