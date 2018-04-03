// http://pixijs.download/release/docs/PIXI.Graphics.html


const graphicsPropTypes = {

  tint: PropTypes.number,

  blendMode: PropTypes.number,

  isMask: PropTypes.bool,

  boundsPadding: PropTypes.number,

};

const graphicsDefaultProps = {

  tint: 0xFFFFFF,

  blendMode: PIXI.BLEND_MODES.NORMAL,

  isMask: false,

  boundsPadding: 0,

};


const graphicsDataPropTypes = {

  lineWidth: PropTypes.number,

  lineColor: PropTypes.number,

  lineAlpha: PropTypes.number,

  fillColor: PropTypes.number,

  fillAlpha: PropTypes.number,

  filling: PropTypes.bool,

  nativeLines: PropTypes.bool,

};

const graphicsDataDefaultProps = {

  lineWidth: 0,

  lineColor: 0,

  lineAlpha: 1,

  fillColor: 0,

  fillAlpha: 1,

  filling: null,

  nativeLines: false,

};


export default function addGraphicsComponent( { name, shouldRedraw, shouldDraw, draw } ) {

  return addComponent( {

    name,

    defaultProps: graphicsDefaultProps,

    create() {

      let graphics = new PIXI.Graphics();

      graphics.settings = {};

      return graphics;

    },

    update( graphics, prevProps, nextProps ) {

      let changeInSettings = applyProps( graphics.settings, graphicsDataDefaultProps, prevProps, nextProps );

      let changeInDrawing = shouldRedraw( prevProps, nextProps );

      if ( changeInSettings || changeInDrawing ) {

        let settings = graphics.settings;

        graphics.clear();

        if ( ! shouldDraw( nextProps ) ) return;

        graphics.nativeLines = settings.nativeLines || false;

        if ( settings.filling !== false ) {

          graphics.beginFill( settings.fillColor, settings.fillAlpha );

        }

        graphics.lineStyle( settings.lineWidth, settings.lineColor, settings.lineAlpha );

        draw( graphics, nextProps );

        graphics.endFill();

      }

    },

  } );

};
