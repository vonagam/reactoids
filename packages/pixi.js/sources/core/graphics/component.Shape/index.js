// http://pixijs.download/release/docs/PIXI.Graphics.html#drawShape


const propTypes = {

  shape: PropTypes.any, //	PIXI.Circle | PIXI.Ellipse | PIXI.Polygon | PIXI.Rectangle | PIXI.RoundedRectangle

};

const defaultProps = {

  shape: undefined,

};


export default addGraphicsComponent( {

  name: 'shape',

  shouldRedraw( prevProps, nextProps ) {

    return nextProps.shape !== prevProps.shape;

  },

  shouldDraw( props ) {

    return props.shape;

  },

  draw( graphics, props ) {

    graphics.drawShape( props.shape );

  },

} );
