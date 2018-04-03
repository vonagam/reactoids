// https://threejs.org/docs/#api/objects/Group


class Group extends BaseObject3D {

  create() {

    return new THREE.Group();

  }

}


export { Group };

export default Reconciler.registerComponent( 'group', Group );
