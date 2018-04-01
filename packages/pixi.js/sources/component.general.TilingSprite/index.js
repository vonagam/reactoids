// http://pixijs.download/release/docs/PIXI.extras.TilingSprite.html


const argTypes = {

  imageId: PropTypes.string,

  crossorigin: PropTypes.bool,

  scaleMode: PropTypes.oneOf( _.values( PIXI.SCALE_MODES ) ),

  source: PropTypes.any,

  frameId: PropTypes.string,

};

const defaultArgs = {

  imageId: null,

  crossorigin: undefined,

  scaleMode: PIXI.settings.SCALE_MODE,

  source: null,

  frameId: null,

};


const propTypes = {

  tileTransform: PropTypes.instanceOf( PIXI.TransformStatic ),

  tileScale: PropTypes.oneOfType( [ PropTypes.object, PropTypes.instanceOf( PIXI.Point ), PropTypes.instanceOf( PIXI.ObservablePoint ) ] ),

  tilePosition: PropTypes.oneOfType( [ PropTypes.object, PropTypes.instanceOf( PIXI.Point ), PropTypes.instanceOf( PIXI.ObservablePoint ) ] ),

  uvTransform: PropTypes.instanceOf( PIXI.TextureMatrix ),

  uvRespectAnchor: PropTypes.bool,

  clampMargin: PropTypes.number,

  // Sprite

  texture: PropTypes.instanceOf( PIXI.Texture ),

  tint: PropTypes.number,

  blendMode: PropTypes.oneOf( _.values( PIXI.BLEND_MODES ) ),

  shader: PropTypes.oneOfType( [ PropTypes.instanceOf( PIXI.Filter ), PropTypes.instanceOf( PIXI.Shader ) ] ),

  anchor: PropTypes.oneOfType( [ PropTypes.object, PropTypes.instanceOf( PIXI.Point ), PropTypes.instanceOf( PIXI.ObservablePoint ) ] ),

  pluginName: PropTypes.string,

};

const defaultProps = {

  tileTransform: new PIXI.TransformStatic(),

  tileScale: new PIXI.Point( 1, 1 ),

  tilePosition: new PIXI.Point( 0, 0 ),

  uvTransform: new PIXI.TextureMatrix(),

  uvRespectAnchor: false,

  clampMargin: 0.5,

  // Sprite

  texture: PIXI.Texture.EMPTY,

  tint: 0xFFFFFF,

  blendMode: PIXI.BLEND_MODES.NORMAL,

  shader: null,

  anchor: new PIXI.Point( 0, 0 ),

  pluginName: 'tilingSprite',

};


export default addComponent( {

  name: 'tilingsprite',

  defaultProps,

  create( props ) {

    if ( props.imageId ) {

      return PIXI.extras.TilingSprite.fromImage( props.imageId, undefined, undefined, props.crossorigin, props.scaleMode );

    }

    if ( props.source ) {

      return PIXI.extras.TilingSprite.from( props.source );

    }

    if ( props.frameId ) {

      return PIXI.extras.TilingSprite.fromFrame( props.frameId );

    }

    return new PIXI.extras.TilingSprite( props.texture || defaultProps.texture );

  },

} );
