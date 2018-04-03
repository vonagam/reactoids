// http://pixijs.download/release/docs/PIXI.particles.ParticleContainer.html


const argTypes = {

  maxSize: PropTypes.number,

  batchSize: PropTypes.number,

};

const defaultArgs = {

  maxSize: 1500,

  batchSize: 16384,

};


const propTypes = {

  autoResize: PropTypes.bool,

  blendMode: PropTypes.oneOf( _.values( PIXI.BLEND_MODES ) ),

  roundPixels: PropTypes.bool,

  tint: PropTypes.number,

};

const defaultProps = {

  autoResize: false,

  blendMode: PIXI.BLEND_MODES.NORMAL,

  roundPixels: true,

  baseTexture: null,

};


const propertiesTypes = {

  doScale: PropTypes.bool,

  doPosition: PropTypes.bool,

  doRotation: PropTypes.bool,

  doUVs: PropTypes.bool,

  doTint: PropTypes.bool,

}

const defaultProperties = {

  doScale: false,

  doPosition: true,

  doRotation: false,

  doUVs: false,

  doTint: false,

}


export default addComponent( {

  name: 'particlecontainer',

  defaultProps,

  create( props ) {

    let pixi = new PIXI.particles.ParticleContainer( props.maxSize, undefined, props.batchSize );

    pixi._properties_props = _.clone( defaultProperties );

    return pixi;

  },

  update( pixi, prevProps, nextProps ) {

    if ( applyProps( pixi._properties_props, defaultProperties, prevProps, nextProps ) ) {

      pixi._properties = _.values( pixi._properties_props );

    }

  },

} );
