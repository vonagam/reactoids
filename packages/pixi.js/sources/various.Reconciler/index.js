import Reconciler from 'react-reconciler';


const unexpectedMethod = function( name ) {

  return function() {

    console.error( `should not be here: "${ name }"` );

  };

};


const PixiReconciler = Reconciler( {

  getRootHostContext: _.constant( undefined ),

  getChildHostContext: _.constant( undefined ),

  getPublicInstance( instance ) {

    return instance;

  },

  createInstance( type, props ) {

    return Components[ type ].create( props );

  },

  appendInitialChild( parent, child ) {

    parent.addChild( child );

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

      Components[ type ].update( instance, oldProps, newProps );

    },

    commitMount: unexpectedMethod( 'commitMount' ),

    commitTextUpdate: unexpectedMethod( 'commitTextUpdate' ),

    resetTextContent: unexpectedMethod( 'resetTextContent' ),

    appendChild( parent, child ) {

      parent.addChild( child );

    },

    appendChildToContainer( root, child ) {

      root.addChild( child );

    },

    insertBefore( parent, child, beforeChild ) {

      parent.addChildAt( child, parent.getChildIndex( beforeChild ) );

    },

    insertInContainerBefore( root, child, beforeChild ) {

      root.addChildAt( child, root.getChildIndex( beforeChild ) );

    },

    removeChild( parent, child ) {

      parent.removeChild( child );

      child.destroy( true );

    },

    removeChildFromContainer( root, child ) {

      root.removeChild( child );

      child.destroy( true );

    },

  },

  // +hydration?: HydrationHostConfig<T, P, I, TI, HI, C, CX, PL>,

  // +persistence?: PersistentUpdatesHostConfig<T, P, I, TI, C, CC, PL>,

} );


PixiReconciler.injectIntoDevTools( {

  bundleType: process.env.NODE_ENV === 'production' ? 0 : 1,

  version: '0.0.0',

  rendererPackageName: '@reactoids/pixi.js',

} );


export default PixiReconciler;
