// http://pixijs.download/release/docs/PIXI.extras.AnimatedSprite.html


const argTypes = {

  autoUpdate: PropTypes.bool,

  images: PropTypes.arrayOf( PropTypes.string ),

  frames: PropTypes.arrayOf( PropTypes.string ),

};

const defaultArgs = {

  autoUpdate: true,

  images: null,

  frames: null,

};


const propTypes = {

  textures: PropTypes.array,

  animationSpeed: PropTypes.number,

  loop: PropTypes.bool,

  onComplete: PropTypes.func,

  onFrameChange: PropTypes.func,

  onLoop: PropTypes.func,

  playing: PropTypes.bool,


  // Sprite

  tint: PropTypes.number,

  blendMode: PropTypes.oneOf( _.values( PIXI.BLEND_MODES ) ),

  shader: PropTypes.oneOfType( [ PropTypes.instanceOf( PIXI.Filter ), PropTypes.instanceOf( PIXI.Shader ) ] ),

  anchor: PropTypes.oneOfType( [ PropTypes.object, PropTypes.instanceOf( PIXI.Point ), PropTypes.instanceOf( PIXI.ObservablePoint ) ] ),

  pluginName: PropTypes.string,

};

const defaultProps = {

  textures: [ PIXI.Texture.EMPTY ],

  animationSpeed: 1,

  loop: true,

  onComplete: null,

  onFrameChange: null,

  onLoop: null,

  playing: true,


  // Sprite

  tint: 0xFFFFFF,

  blendMode: PIXI.BLEND_MODES.NORMAL,

  shader: null,

  anchor: new PIXI.Point( 0, 0 ),

  pluginName: 'sprite',

};


export default addComponent( {

  name: 'animatedsprite',

  defaultProps,

  create( props ) {

    if ( props.images ) {

      return PIXI.extras.AnimatedSprite.fromImages( props.images );

    }

    if ( props.frames ) {

      return PIXI.extras.AnimatedSprite.fromImages( props.frames );

    }

    return new PIXI.extras.AnimatedSprite( [ PIXI.Texture.EMPTY ], props.autoUpdate );

  },

  update( pixi, prevProps, nextProps ) {

    if ( nextProps.playing !== prevProps.playing ) {

      if ( nextProps.playing ) {

        pixi.play();

      } else {

        pixi.stop();

      }

    }

  },

} );
