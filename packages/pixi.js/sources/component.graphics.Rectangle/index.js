// http://pixijs.download/release/docs/PIXI.Graphics.html#drawRect


const propTypes = {

  w: PropTypes.number,

  h: PropTypes.number,

};

const defaultProps = {

  w: 0,

  h: 0,

};


export default addGraphicsComponent( {

  name: 'rectangle',

  shouldRedraw( prevProps, nextProps ) {

    return nextProps.w !== prevProps.w || nextProps.h !== prevProps.h;

  },

  shouldDraw( props ) {

    return props.w && props.h;

  },

  draw( graphics, props ) {

    graphics.drawRect( 0, 0, props.w, props.h );

  },

} );
