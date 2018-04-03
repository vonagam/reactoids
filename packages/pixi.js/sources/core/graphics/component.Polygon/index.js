// http://pixijs.download/release/docs/PIXI.Graphics.html#drawPolygon


const propTypes = {

  path: PropTypes.array, // Array< number >, Array< PIXI.Point > or PIXI.Polygon

};

const defaultProps = {

  path: [],

};


export default addGraphicsComponent( {

  name: 'polygon',

  shouldRedraw( prevProps, nextProps ) {

    return ! _.isEqual( nextProps.path, prevProps.path ) || nextProps.close !== prevProps.close;

  },

  shouldDraw( props ) {

    return ! _.isEmpty( props.path );

  },

  draw( graphics, props ) {

    let data = graphics.drawPolygon( props.path );

  },

} );
