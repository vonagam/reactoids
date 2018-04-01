// http://pixijs.download/release/docs/PIXI.Graphics.html#drawCircle


const propTypes = {

  radius: PropTypes.number,

};

const defaultProps = {

  radius: undefined,

};


export default addGraphicsComponent( {

  name: 'circle',

  shouldRedraw( prevProps, nextProps ) {

    return nextProps.radius !== prevProps.radius;

  },

  shouldDraw( props ) {

    return props.radius;

  },

  draw( graphics, props ) {

    graphics.drawCircle( 0, 0, props.radius );

  },

} );
