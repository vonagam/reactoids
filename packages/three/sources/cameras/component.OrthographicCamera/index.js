// https://threejs.org/docs/index.html#api/cameras/OrthographicCamera


const defaultProps = {

  zoom: 1,

  near: 0.1,

  far: 2000,

  left: 0,

  right: 0,

  top: 0,

  bottom: 0,

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


class OrthographicCamera extends BaseCamera {

  createCamera() {

    return new THREE.OrthographicCamera( 0, 0, 0, 0 );

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


export { OrthographicCamera };

export default Reconciler.registerComponent( 'orthographiccamera', OrthographicCamera );
