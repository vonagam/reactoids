// https://threejs.org/docs/#api/objects/Group


class Group extends BaseObject {

  create() {

    return new THREE.Group();

  }

}


export { Group };

export default Reconciler.registerComponent( 'group', Group );
