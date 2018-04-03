// https://threejs.org/docs/#api/materials/MeshBasicMaterial


class MeshBasicMaterial extends BaseMaterial {

  static propsSchema = _.assign( {}, BaseMaterial.propsSchema, {

    color: { set( that, value ) { that.color.set( value ) }, defaultValue: new THREE.Color( 0xffffff ) },

    map: Setters.set( null ),

    lightMap: Setters.set( null ),

    lightMapIntensity: Setters.set( 1.0 ),

    aoMap: Setters.set( null ),

    aoMapIntensity: Setters.set( 1.0 ),

    specularMap: Setters.set( null ),

    alphaMap: Setters.set( null ),

    envMap: Setters.set( null ),

    combine: Setters.set( THREE.MultiplyOperation ),

    reflectivity: Setters.set( 1 ),

    refractionRatio: Setters.set( 0.98 ),

    wireframe: Setters.set( false ),

    wireframeLinewidth: Setters.set( 1 ),

    wireframeLinecap: Setters.set( 'round' ),

    wireframeLinejoin: Setters.set( 'round' ),

    skinning: Setters.set( false ),

    morphTargets: Setters.set( false ),

    lights: Setters.set( false ),

  } );

  create() {

    return new THREE.MeshBasicMaterial();

  }

}


export { MeshBasicMaterial };

export default Reconciler.registerComponent( 'meshbasicmaterial', MeshBasicMaterial );
