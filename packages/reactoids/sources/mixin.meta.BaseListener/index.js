export default BaseListenerMixin = Mixin.create( {

  name: 'BaseListenerMixin',

  argTypes: {

    name: PropTypes.string,

    plural: PropTypes.bool,

    initListener: PropTypes.func, // ( that: mixed, data: mixed, key?: string ) => void

    toggleListener: PropTypes.func, // ( that: mixed, data: mixed, bool: boolean, key?: string ) => void

  },

  defaultArgs: {

    name: '',

    initListener: ( that, data, key ) => data,

  },

  mixin( ARGS ) {

    const method = _.pascalCase( `${ ARGS.name }Listener` );

    const member = `_${ _.camelCase( ARGS.name ) }BaseListenerMixin`;

    const initListener = function( that, listener, bool ) {

      listener.data = ARGS.initListener( that, listener.data, listener.key );

      listener.turned = false;

      toggleListener( that, listener, bool );

    };

    const toggleListener = function( that, listener, bool ) {

      if ( listener.turned === bool ) return;

      ARGS.toggleListener( that, listener.data, bool, listener.key );

      listener.turned = bool;

    };


    if ( ARGS.plural ) {

      return {

        getInitialMembers() {

          return { [ member ]: {} };

        },

        componentWillUnmount() {

          let listeners = this[ member ];

          _.each( listeners, ( listener ) => {

            toggleListener( this, listener, false );

          } );

        },

        [ `add${ method }` ]( key, data, bool ) {

          bool = bool !== false;

          let listeners = this[ member ];

          if ( listeners[ key ] ) throw new Error( `BaseListenerMixin: listener with key '${ key }' already exists` );

          let listener = { key, data };

          listeners[ key ] = listener;

          initListener( this, listener, bool );

        },

        [ `get${ method }State` ]( key ) {

          let listener = this[ member ][ key ];

          if ( ! listener ) return undefined;

          return listener.turned;

        },

        [ `toggle${ method }` ]( key, bool ) {

          let listener = this[ member ][ key ];

          if ( ! listener ) throw new Error( `BaseListenerMixin: listener with key '${ key }' does not exist` );

          toggleListener( this, listener, bool );

        },

        [ `remove${ method }` ]( key ) {

          let listeners = this[ member ];

          let listener = listeners[ key ];

          if ( ! listener ) throw new Error( `BaseListenerMixin: listener with key '${ key }' does not exist` );

          toggleListener( this, listener, false );

          delete listeners[ key ];

        },

      };

    } else {

      return {

        getInitialMembers() {

          return { [ member ]: undefined };

        },

        componentWillUnmount() {

          let listener = this[ member ];

          if ( listener ) toggleListener( this, listener, false );

        },

        [ `add${ method }` ]( data, bool ) {

          bool = bool !== false;

          if ( this[ member ] ) throw new Error( `BaseListenerMixin: listener already exists` );

          let listener = { data };

          this[ member ] = listener;

          initListener( this, listener, bool );

        },

        [ `get${ method }State` ]() {

          let listener = this[ member ];

          if ( ! listener ) return undefined;

          return listener.turned;

        },

        [ `toggle${ method }` ]( bool ) {

          let listener = this[ member ];

          if ( ! listener ) throw new Error( `BaseListenerMixin: listener does not exist` );

          toggleListener( this, listener, bool );

        },

        [ `remove${ method }` ]() {

          let listener = this[ member ];

          if ( ! listener ) throw new Error( `BaseListenerMixin: listener does not exist` );

          toggleListener( this, listener, false );

          this[ member ] = undefined;

        },

      };

    }

  },

} );
