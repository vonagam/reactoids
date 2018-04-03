// https://threejs.org/docs/index.html#api/cameras/PerspectiveCamera


const defaultProps = {

  zoom: 1,

  near: 0.1,

  far: 2000,

  fov: 50,

  focus: 10,

  aspect: 1,

  filmGauge: 35,

  filmOffset: 0,

};

const defaultViewOffset = {

  enabled: true,

  fullWidth: 1,

  fullHeight: 1,

  offsetX: 0,

  offsetY: 0,

  width: 1,

  height: 1,

};


class PerspectiveCamera extends BaseCamera {

  createCamera() {

    return new THREE.PerspectiveCamera();

  }

  update( prevProps, nextProps ) {

    BaseCamera.prototype.update.apply( this, arguments );


    let camera = this.three;

    let hasChange;


    if ( onPropsDiff( defaultProps, prevProps, nextProps,

      ( key ) => { camera[ key ] = nextProps[ key ] },

      ( key ) => { camera[ key ] = defaultProps[ key ] },

      _.noop,

    ) ) {

      hasChange = true;

    };


    if ( ! _.isEqual( nextProps.viewOffset, prevProps.viewOffset ) ) {

      if ( nextProps.viewOffset ) {

        camera.view = _.assign( camera.view || {}, defaultViewOffset, nextProps.viewOffset );

      } else {

        camera.view = null;

      }

      hasChange = true;

    }


    if ( hasChange ) {

      camera.updateProjectionMatrix();

    }

  }

}


export { PerspectiveCamera };

export default Reconciler.registerComponent( 'perspectivecamera', PerspectiveCamera );
