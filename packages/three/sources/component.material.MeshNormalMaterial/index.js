// https://threejs.org/docs/#api/materials/MeshNormalMaterial


class MeshNormalMaterial extends BaseMaterial {

  static propsSchema = _.assign( {}, BaseMaterial.propsSchema, {

    bumpMap: Setters.set( null ),

    bumpScale: Setters.set( 1 ),

    normalMap: Setters.set( null ),

    normalScale: Setters.copy( new THREE.Vector2( 1, 1 ) ),

    normalScaleX: { set( that, value ) { that.normalScale.x = value }, defaultValue: 1 },

    normalScaleY: { set( that, value ) { that.normalScale.y = value }, defaultValue: 1 },

    displacementMap: Setters.set( null ),

    displacementScale: Setters.set( 1 ),

    displacementBias: Setters.set( 0 ),

    wireframe: Setters.set( false ),

    wireframeLinewidth: Setters.set( 1 ),

    fog: Setters.set( false ),

    lights: Setters.set( false ),

    skinning: Setters.set( false ),

    morphTargets: Setters.set( false ),

    morphNormals: Setters.set( false ),

  } );

  create() {

    return new THREE.MeshNormalMaterial();

  }

}


export { MeshNormalMaterial };

export default Reconciler.registerComponent( 'meshnormalmaterial', MeshNormalMaterial );
