// http://pixijs.download/release/docs/PIXI.Application.html


export default class PixiApplication extends React.Component {

  static propTypes = {

    options: PropTypes.shape( {

      autoStart: PropTypes.bool,

      width: PropTypes.number,

      height: PropTypes.number,

      view: PropTypes.instanceOf( HTMLCanvasElement ),

      transparent: PropTypes.bool,

      antialias: PropTypes.bool,

      preserveDrawingBuffer: PropTypes.bool,

      resolution: PropTypes.number,

      forceCanvas: PropTypes.bool,

      backgroundColor: PropTypes.number,

      clearBeforeRender: PropTypes.bool,

      roundPixels: PropTypes.bool,

      forceFXAA: PropTypes.bool,

      legacy: PropTypes.bool,

      powerPreference: PropTypes.string,

      sharedTicker: PropTypes.bool,

      sharedLoader: PropTypes.bool,

    } ),

    height: PropTypes.number,

    width: PropTypes.number,

    children: PropTypes.node,

  };

  componentDidMount() {

    let { options, width, height, children } = this.props;

    let { view } = this.refs;

    this.pixi = new PIXI.Application( { view, width, height, ...options } );

    this.container = Reconciler.createContainer( this.pixi.stage );

    this.updateContainer();

  }

  componentDidUpdate( prevProps ) {

    let { width, height } = this.props;

    if ( width !== prevProps.width || height !== prevProps.height ) {

      this.pixi.renderer.resize( width, height );

    }

    this.updateContainer();

  }

  componentWillUnmount() {

    this.updateContainer( null );

    this.pixi.destroy();

  }

  updateContainer( children = this.props.children ) {

    Reconciler.updateContainer( children, this.container, this );

  }

  render() {

    let props = _.omit( this.props, _.keys( PixiApplication.propTypes ) );

    return <canvas ref='view' {... props } />;

  }

}
