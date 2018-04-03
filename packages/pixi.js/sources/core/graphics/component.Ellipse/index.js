// http://pixijs.download/release/docs/PIXI.Graphics.html#drawEllipse


const propTypes = {

  radiusX: PropTypes.number,

  radiusY: PropTypes.number,

};

const defaultProps = {

  radiusX: 0,

  radiusY: 0,

};


export default addGraphicsComponent( {

  name: 'ellipse',

  shouldRedraw( prevProps, nextProps ) {

    return nextProps.radiusX !== prevProps.radiusX || nextProps.radiusY !== prevProps.radiusY;

  },

  shouldDraw( props ) {

    return props.radiusX && props.radiusY;

  },

  draw( graphics, props ) {

    graphics.drawEllipse( 0, 0, ( props.radiusX || 0 ), ( props.radiusY || 0 ) );

  },

} );
