// https://threejs.org/docs/index.html#api/objects/Mesh


class Mesh extends BaseObject {

  static propsSchema = _.assign( {}, BaseObject.propsSchema, {

    geometry: {

      set( that, value ) {

        that.geometry = value;

        that.updateMorphTargets();

      },

      defaultValue: new THREE.BufferGeometry(),

    },

    material: Setters.set( new THREE.MeshBasicMaterial( { color: 0xffffff } ) ),

    drawMode: Setters.set( THREE.TrianglesDrawMode ),

  } );

  create( props ) {

    return new THREE.Mesh(

      props.geometry || Mesh.propsSchema.geometry.defaultValue,

      props.material || Mesh.propsSchema.material.defaultValue,

    );

  }

}


export { Mesh };

export default Reconciler.registerComponent( 'mesh', Mesh );
