// http://pixijs.download/release/docs/PIXI.Graphics.html#drawStar


const propTypes = {

  points: PropTypes.number,

  radius: PropTypes.number,

  innerRadius: PropTypes.number,

  rotation: PropTypes.number,

};

const defaultProps = {

  points: undefined,

  radius: undefined,

  innerRadius: undefined, // half of radius

  rotation: 0,

};


export default addGraphicsComponent( {

  name: 'star',

  shouldRedraw( prevProps, nextProps ) {

    return (

      nextProps.points !== prevProps.points ||

      nextProps.radius !== prevProps.radius ||

      nextProps.innerRadius !== prevProps.innerRadius ||

      nextProps.rotation !== prevProps.rotation

    );

  },

  shouldDraw( props ) {

    return props.points && props.radius;

  },

  draw( graphics, props ) {

    graphics.drawStar( 0, 0, props.points, props.radius, props.innerRadius, props.rotation );

    graphics.closePath();

  },

} );
