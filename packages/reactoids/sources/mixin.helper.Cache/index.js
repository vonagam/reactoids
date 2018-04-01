export default CacheMixin = Mixin.create( {

  name: 'CacheMixin',

  mixin: _.once( () => {

    const setCache = function( that, key, options ) {

      let cache = that._CacheMixin;

      let item = {

        value: options.getter ? options.getter.call( that, key, that ) : options.value,

        depends: _.isEmpty( options.depends ) ? false : options.depends,

      };

      if ( item.depends ) cache.depends++;

      cache.items[ key ] = item;

    };

    const clearCache = function( that, key ) {

      let cache = that._CacheMixin;

      let item = cache.items[ key ];

      if ( ! item ) return;

      if ( item.depends ) cache.depends--;

      delete cache.items[ key ];

    };


    return {

      getInitialMembers() {

        return { _CacheMixin: { items: {}, depends: 0 } };

      },

      componentWillUpdate( nextProps, nextState, nextContext ) {

        let { items, depends } = this._CacheMixin;

        if ( depends === 0 ) return;

        let prev = { props: this.props, state: this.state, context: this.context };

        let next = { props: nextProps, state: nextState, context: nextContext };

        _.each( items, ( item, key ) => {

          if ( ! item.depends ) return;

          if ( _.every( item.depends, ( key ) => _.isEqual( _.get( prev, key ), _.get( next, key ) ) ) ) return;

          clearCache( this, key );

        } );

      },

      cache( key, options ) {

        let { items } = this._CacheMixin;

        if ( ! _.hasOwn( items, key ) ) {

          setCache( this, key, options );

        }

        return items[ key ].value;

      },

      clearCache( key ) {

        if ( key === undefined ) {

          this._CacheMixin = { items: {}, depends: 0 };

        } else {

          clearCache( this, key );

        }

      },

    };

  } ),

} );
