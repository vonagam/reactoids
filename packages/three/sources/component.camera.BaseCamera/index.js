// https://threejs.org/docs/index.html#api/cameras/Camera


export default class BaseCamera extends BaseObject {

  create( props, root ) {

    let camera = this.createCamera( props, root );

    camera.userData.root = root;

    if ( root.camera ) {

      throw new Error( 'BaseCamera#create: three root container already has camera' );

    }

    root.camera = camera;

    return camera;

  }

  createCamera( props, root ) {

    throw new Error( 'BaseCamera#createCamera method should be overwritten' );

  }

  unmount( parent ) {

    BaseObject.prototype.unmount.apply( this, arguments );

    this.three.userData.root.camera = undefined;

  }

}
