// http://pixijs.download/release/docs/PIXI.Graphics.html#drawRoundedRect


const propTypes = {

  w: PropTypes.number,

  h: PropTypes.number,

  radius: PropTypes.number,

};

const defaultProps = {

  w: 0,

  h: 0,

  radius: 20,

};


export default addGraphicsComponent( {

  name: 'roundedrectangle',

  shouldRedraw( prevProps, nextProps ) {

    return nextProps.w !== prevProps.w || nextProps.h !== prevProps.h || nextProps.radius !== prevProps.radius;

  },

  shouldDraw( props ) {

    return props.w && props.h;

  },

  draw( graphics, props ) {

    graphics.drawRoundedRect( 0, 0, props.w, props.h, props.radius );

  },

} );
