// http://pixijs.download/release/docs/PIXI.Graphics.html


const propTypes = {

  shouldRedraw: PropTypes.func,

  shouldDraw: PropTypes.func,

  draw: PropTypes.func,

};

const defaultProps = {

  shouldRedraw( prevProps, nextProps ) {

    return nextProps.draw !== undefined || prevProps.draw !== undefined;

  },

  shouldDraw( props ) {

    return true;

  },

  draw: null,

};


export default addGraphicsComponent( {

  name: 'graphic',

  shouldRedraw( prevProps, nextProps ) {

    return ( nextProps.shouldDraw || defaultProps.shouldRedraw )( prevProps, nextProps );

  },

  shouldDraw( props ) {

    return props.draw && ( props.shouldDraw || defaultProps.shouldDraw )( props );

  },

  draw( graphics, props ) {

    props.draw( graphics, props );

  },

} );
