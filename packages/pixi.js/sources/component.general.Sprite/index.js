// http://pixijs.download/release/docs/PIXI.Sprite.html


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

  texture: PropTypes.instanceOf( PIXI.Texture ),

  tint: PropTypes.number,

  blendMode: PropTypes.oneOf( _.values( PIXI.BLEND_MODES ) ),

  shader: PropTypes.oneOfType( [ PropTypes.instanceOf( PIXI.Filter ), PropTypes.instanceOf( PIXI.Shader ) ] ),

  anchor: PropTypes.oneOfType( [ PropTypes.object, PropTypes.instanceOf( PIXI.Point ), PropTypes.instanceOf( PIXI.ObservablePoint ) ] ),

  pluginName: PropTypes.string,

};

const defaultProps = {

  texture: PIXI.Texture.EMPTY,

  tint: 0xFFFFFF,

  blendMode: PIXI.BLEND_MODES.NORMAL,

  shader: null,

  anchor: new PIXI.Point( 0, 0 ),

  pluginName: 'sprite',

};


export default addComponent( {

  name: 'sprite',

  defaultProps,

  create( props ) {

    if ( props.imageId ) {

      return PIXI.Sprite.fromImage( props.imageId, props.crossorigin, props.scaleMode );

    }

    if ( props.source ) {

      return PIXI.Sprite.from( props.source );

    }

    if ( props.frameId ) {

      return PIXI.Sprite.fromFrame( props.frameId );

    }

    return new PIXI.Sprite();

  },

} );
