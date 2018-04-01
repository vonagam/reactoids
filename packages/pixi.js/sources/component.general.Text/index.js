// http://pixijs.download/release/docs/PIXI.Text.html


const propTypes = {

  text: PropTypes.string,

  resolution: PropTypes.number,

  style: PropTypes.object,

  // Sprite

  texture: PropTypes.instanceOf( PIXI.Texture ),

  tint: PropTypes.number,

  blendMode: PropTypes.oneOf( _.values( PIXI.BLEND_MODES ) ),

  shader: PropTypes.oneOfType( [ PropTypes.instanceOf( PIXI.Filter ), PropTypes.instanceOf( PIXI.Shader ) ] ),

  anchor: PropTypes.oneOfType( [ PropTypes.object, PropTypes.instanceOf( PIXI.Point ), PropTypes.instanceOf( PIXI.ObservablePoint ) ] ),

  pluginName: PropTypes.string,

};

const defaultProps = {

  text: null,

  resolution: PIXI.settings.RESOLUTION,

  style: null,

  // Sprite

  texture: PIXI.Texture.EMPTY,

  tint: 0xFFFFFF,

  blendMode: PIXI.BLEND_MODES.NORMAL,

  shader: null,

  anchor: new PIXI.Point( 0, 0 ),

  pluginName: 'sprite',

};


const styleTypes = {

  align: PropTypes.string,

  breakWords: PropTypes.bool,

  dropShadow: PropTypes.bool,

  dropShadowAlpha: PropTypes.number,

  dropShadowAngle: PropTypes.number,

  dropShadowBlur: PropTypes.number,

  dropShadowColor: PropTypes.oneOfType( [ PropTypes.string, PropTypes.number ] ),

  dropShadowDistance: PropTypes.number,

  fill: PropTypes.any,

  fillGradientType: PropTypes.oneOf( _.values( PIXI.TEXT_GRADIENT ) ),

  fillGradientStops: PropTypes.arrayOf( PropTypes.number ),

  fontFamily: PropTypes.oneOfType( [ PropTypes.string, PropTypes.arrayOf( PropTypes.string ) ] ),

  fontSize: PropTypes.oneOfType( [ PropTypes.string, PropTypes.number ] ),

  fontStyle: PropTypes.string,

  fontVariant: PropTypes.string,

  fontWeight: PropTypes.string,

  letterSpacing: PropTypes.number,

  lineHeight: PropTypes.number,

  lineJoin: PropTypes.string,

  miterLimit: PropTypes.number,

  padding: PropTypes.number,

  stroke: PropTypes.oneOfType( [ PropTypes.string, PropTypes.number ] ),

  strokeThickness: PropTypes.number,

  trim: PropTypes.bool,

  textBaseline: PropTypes.string,

  wordWrap: PropTypes.bool,

  wordWrapWidth: PropTypes.number,

  leading: PropTypes.number,

};

const defaultStyles = {

  align: 'left',

  breakWords: false,

  dropShadow: false,

  dropShadowAlpha: 1,

  dropShadowAngle: Math.PI / 6,

  dropShadowBlur: 0,

  dropShadowColor: 'black',

  dropShadowDistance: 5,

  fill: 'black',

  fillGradientType: PIXI.TEXT_GRADIENT.LINEAR_VERTICAL,

  fillGradientStops: [],

  fontFamily: 'Arial',

  fontSize: 26,

  fontStyle: 'normal',

  fontVariant: 'normal',

  fontWeight: 'normal',

  letterSpacing: 0,

  lineHeight: 0,

  lineJoin: 'miter',

  miterLimit: 10,

  padding: 0,

  stroke: 'black',

  strokeThickness: 0,

  textBaseline: 'alphabetic',

  trim: false,

  wordWrap: false,

  wordWrapWidth: 100,

  leading: 0,

};


export default addComponent( {

  name: 'text',

  defaultProps,

  create() {

    return new PIXI.Text();

  },

  update( pixi, prevProps, nextProps ) {

    if ( ! nextProps.style ) {

      if ( applyProps( pixi.style, defaultStyles, prevProps, nextProps ) ) {

        pixi.style = pixi.style;

      }

    }

  },

} );
