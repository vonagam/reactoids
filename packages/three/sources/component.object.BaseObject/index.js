// https://threejs.org/docs/#api/core/Object3D


export default class BaseObjectComponent extends BaseComponent {

  static propsSchema = _.assign( {}, BaseComponent.propsSchema, {

    name: Setters.set( '' ),

    up: Setters.copy( THREE.Object3D.DefaultUp ),

    position: Setters.copy( new THREE.Vector3() ),

    positionX: { set( that, value ) { that.position.x = value }, defaultValue: 0 },

    positionY: { set( that, value ) { that.position.y = value }, defaultValue: 0 },

    positionZ: { set( that, value ) { that.position.z = value }, defaultValue: 0 },

    rotation: Setters.copyDifferent( new THREE.Euler() ),

    rotationX: { set( that, value ) { that.rotation.x = value }, defaultValue: 0 },

    rotationY: { set( that, value ) { that.rotation.y = value }, defaultValue: 0 },

    rotationZ: { set( that, value ) { that.rotation.z = value }, defaultValue: 0 },

    quaternion: Setters.copyDifferent( new THREE.Quaternion() ),

    scale: Setters.copy( new THREE.Vector3( 1, 1, 1 ) ),

    scaleX: { set( that, value ) { that.scale.x = value }, defaultValue: 1 },

    scaleY: { set( that, value ) { that.scale.y = value }, defaultValue: 1 },

    scaleZ: { set( that, value ) { that.scale.z = value }, defaultValue: 1 },

    matrix: {

      set( that, value ) {

        if ( that.matrix.equals( value ) ) return;

        that.matrix.copy( value );

        that.matrix.decompose( that.position, that.quaternion, that.scale );

      },

      copy: true,

      defaultValue: new THREE.Matrix4(),

    },

    matrixAutoUpdate: Setters.set( THREE.Object3D.DefaultMatrixAutoUpdate ),

    layers: {

      set( that, value ) {

        that.layers.mask = _.isNumber( value ) ? value : value.mask;

      },

      defaultValue: 1,

    },

    visible: Setters.set( true ),

    castShadow: Setters.set( false ),

    receiveShadow: {

      set( that, value ) {

        if ( that.receiveShadow === value ) return;

        that.receiveShadow = value;

        if ( that.material ) that.material.needsUpdate = true;

      },

      defaultValue: false,

    },

    frustumCulled: Setters.set( true ),

    renderOrder: Setters.set( 0 ),

  } );

  mount( parent ) {

    BaseComponent.prototype.mount.apply( this, arguments );

    parent.three.add( this.three );

  }

  unmount( parent, nested ) {

    BaseComponent.prototype.unmount.apply( this, arguments );

    if ( ! nested ) parent.three.remove( this.three );

  }

}
