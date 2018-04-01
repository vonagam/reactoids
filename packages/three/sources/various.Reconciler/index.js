import Reconciler from 'react-reconciler';


const unexpectedMethod = function( name ) {

  return function() {

    console.error( `should not be here: "${ name }"` );

  };

};


const Components = {};


const ThreeReconciler = Reconciler( {

  getRootHostContext: _.constant( undefined ),

  getChildHostContext: _.constant( undefined ),

  getPublicInstance( instance ) {

    return instance.three;

  },

  createInstance( type, props, root ) {

    return new Components[ type ]( props, root );

  },

  appendInitialChild( parent, child ) {

    child.mount( parent );

  },

  finalizeInitialChildren: _.constant( false ),

  prepareUpdate: _.constant( true ),

  shouldSetTextContent: _.constant( false ),

  shouldDeprioritizeSubtree: unexpectedMethod( 'shouldDeprioritizeSubtree' ),

  createTextInstance: unexpectedMethod( 'createTextInstance' ),

  scheduleDeferredCallback: unexpectedMethod( 'scheduleDeferredCallback' ),

  cancelDeferredCallback: unexpectedMethod( 'cancelDeferredCallback' ),

  prepareForCommit: _.noop,

  resetAfterCommit: _.noop,

  now: _.constant( 0 ),

  mutation: {

    commitUpdate( instance, updatePayload, type, oldProps, newProps ) {

      instance.update( oldProps, newProps );

    },

    commitMount: unexpectedMethod( 'commitMount' ),

    commitTextUpdate: unexpectedMethod( 'commitTextUpdate' ),

    resetTextContent: unexpectedMethod( 'resetTextContent' ),

    appendChild( parent, child ) {

      child.mount( parent );

    },

    appendChildToContainer( root, child ) {

      child.mount( root );

    },

    insertBefore( parent, child, beforeChild ) {

      child.mount( parent );

    },

    insertInContainerBefore( root, child, beforeChild ) {

      child.mount( root );

    },

    removeChild( parent, child ) {

      child.unmount( parent );

    },

    removeChildFromContainer( root, child ) {

      child.unmount( root );

    },

  },

  // +hydration?: HydrationHostConfig<T, P, I, TI, HI, C, CX, PL>,

  // +persistence?: PersistentUpdatesHostConfig<T, P, I, TI, C, CC, PL>,

} );


ThreeReconciler.injectIntoDevTools( {

  bundleType: process.env.NODE_ENV === 'production' ? 0 : 1,

  version: '0.0.0',

  rendererPackageName: '@reactoids/three',

} );


ThreeReconciler.registerComponent = function( name, componentClass ) {

  Components[ name ] = componentClass;

  return name;

};


export default ThreeReconciler;
