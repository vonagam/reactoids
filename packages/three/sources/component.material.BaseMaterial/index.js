// https://threejs.org/docs/#api/materials/Material


export default class BaseObjectComponent extends BaseComponent {

  static propsSchema = _.assign( {}, BaseComponent.propsSchema, {

    name: Setters.set( '' ),

    fog: Setters.set( true ),

    lights: Setters.set( true ),

    blending: Setters.set( THREE.NormalBlending ),

    side: Setters.set( THREE.FrontSide ),

    flatShading: Setters.set( false ),

    vertexColors: Setters.set( THREE.NoColors ),

    opacity: Setters.set( 1 ),

    transparent: Setters.set( false ),

    blendSrc: Setters.set( THREE.SrcAlphaFactor ),

    blendDst: Setters.set( THREE.OneMinusSrcAlphaFactor ),

    blendEquation: Setters.set( THREE.AddEquation ),

    blendSrcAlpha: Setters.set( null ),

    blendDstAlpha: Setters.set( null ),

    blendEquationAlpha: Setters.set( null ),

    depthFunc: Setters.set( THREE.LessEqualDepth ),

    depthTest: Setters.set( true ),

    depthWrite: Setters.set( true ),

    clippingPlanes: Setters.set( null ),

    clipIntersection: Setters.set( false ),

    clipShadows: Setters.set( false ),

    shadowSide: Setters.set( null ),

    colorWrite: Setters.set( true ),

    precision: Setters.set( null ),

    polygonOffset: Setters.set( false ),

    polygonOffsetFactor: Setters.set( 0 ),

    polygonOffsetUnits: Setters.set( 0 ),

    dithering: Setters.set( false ),

    alphaTest: Setters.set( 0 ),

    premultipliedAlpha: Setters.set( false ),

    overdraw: Setters.set( 0 ),

    visible: Setters.set( true ),

  } );

  mount( parent ) {

    BaseComponent.prototype.mount.apply( this, arguments );

    parent.three.material = this.three;

  }

  unmount( parent, nested ) {

    BaseComponent.prototype.unmount.apply( this, arguments );

    if ( ! nested ) parent.three.material = null;

  }

}
