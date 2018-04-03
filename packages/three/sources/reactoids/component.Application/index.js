// https://threejs.org/docs/#api/renderers/WebGLRenderer
// https://threejs.org/docs/#api/scenes/Scene


const scenePropTypes = {

  background: PropTypes.oneOfType( [ PropTypes.instanceOf( THREE.Color ), PropTypes.instanceOf( THREE.Texture ) ] ),

  fog: PropTypes.instanceOf( THREE.Fog ),

  overrideMaterial: PropTypes.instanceOf( THREE.Material ),

};

const sceneDefaultProps = {

  background: null,

  fog: null,

  overrideMaterial: null,

};

const updateScene = function( scene, prevProps, nextProps ) {

  onPropsDiff( sceneDefaultProps, prevProps, nextProps,

    ( key ) => { scene[ key ] = nextProps[ key ] },

    ( key ) => { scene[ key ] = sceneDefaultProps[ key ] },

    _.noop,

  );

};


const rendererPropTypes = {

  rendererArgs: PropTypes.shape( {

    precision: PropTypes.oneOf( [ 'highp', 'mediump', 'lowp' ] ), // highest available

    alpha: PropTypes.bool, // false

    premultipliedAlpha: PropTypes.bool, // true

    antialias: PropTypes.bool, // false

    stencil: PropTypes.bool, // true

    preserveDrawingBuffer: PropTypes.bool, // false

    powerPreference: PropTypes.oneOf( [ 'high-performance', 'low-power', 'default' ] ),

    depth: PropTypes.bool, // true

    logarithmicDepthBuffer: PropTypes.bool, // false

  } ),

  renderer: PropTypes.shape( {

    autoClear: PropTypes.bool,

    autoClearColor: PropTypes.bool,

    autoClearDepth: PropTypes.bool,

    autoClearStencil: PropTypes.bool,

    sortObjects: PropTypes.bool,

    clippingPlanes: PropTypes.array,

    localClippingEnabled: PropTypes.bool,

    gammaFactor: PropTypes.number,

    gammaInput: PropTypes.bool,

    gammaOutput: PropTypes.bool,

    physicallyCorrectLights: PropTypes.bool,

    toneMapping: PropTypes.oneOf( [ THREE.NoToneMapping, THREE.LinearToneMapping, THREE.ReinhardToneMapping, THREE.Uncharted2ToneMapping, THREE.CineonToneMapping ] ),

    toneMappingExposure: PropTypes.number,

    toneMappingWhitePoint: PropTypes.number,

    maxMorphTargets: PropTypes.number,

    maxMorphNormals: PropTypes.number,

    // shadowMap.enabled

  } ),

};

const rendererDefaultSettings = {

  autoClear: true,

  autoClearColor: true,

  autoClearDepth: true,

  autoClearStencil: true,

  sortObjects: true,

  clippingPlanes: [],

  localClippingEnabled: false,

  gammaFactor: 2.0,

  gammaInput: false,

  gammaOutput: false,

  physicallyCorrectLights: false,

  toneMapping: THREE.LinearToneMapping,

  toneMappingExposure: 1.0,

  toneMappingWhitePoint: 1.0,

	maxMorphTargets: 8,

  maxMorphNormals: 4,

};

const rendererDefaultProps = {

};

const updateRenderer = function( renderer, prevProps, nextProps ) {

  if ( _.isEqual( nextProps.renderer, prevProps.renderer ) ) return;

  _.assign( renderer, rendererDefaultSettings, nextProps.renderer );

};


const updateThrees = function( that, prevProps ) {

  updateScene( that.scene, prevProps, that.props );

  updateRenderer( that.renderer, prevProps, that.props );

};

const updateContainer = function( that, children ) {

  Reconciler.updateContainer( children, that.container, that );

};


export default class ThreeApplication extends React.Component {

  static propTypes = _.assign( {}, scenePropTypes, rendererPropTypes, {

    onAnimationFrame: PropTypes.func,

    children: PropTypes.node,

  } );

  static defaultProps = _.assign( {}, sceneDefaultProps, rendererDefaultProps, {

    onAnimationFrame: _.noop,

  } );

  componentDidMount() {

    this.scene = new THREE.Scene();

    this.instance = { three: this.scene, children: [], camera: undefined };

    this.container = Reconciler.createContainer( this.instance );

    this.renderer = new THREE.WebGLRenderer( _.assign( {}, this.props.rendererArgs, { canvas: this.refs.canvas } ) );

    updateThrees( this, {} );

    updateContainer( this, this.props.children );

    this.renderer.animate( ( time ) => {

      this.props.onAnimationFrame( time );

      this.renderer.render( this.scene, this.instance.camera );

    } );

  }

  componentDidUpdate( prevProps ) {

    updateThrees( this, prevProps );

    updateContainer( this, this.props.children );

  }

  componentWillUnmount() {

    this.renderer.animate( null );

    updateContainer( this, null );

    this.renderer.dispose();

  }

  render() {

    let props = _.omit( this.props, _.keys( ThreeApplication.propTypes ) );

    return <canvas ref='canvas' {... props } />;

  }

}
