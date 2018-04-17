export default CallbackMixin = Mixin.create( {

  name: 'CallbackMixin',

  mixin: _.once( () => {

    return {

      callbacks( keys ) {

        let that = this;


        this.callbacks = _.memoize(

          ( keys ) => {

            keys = _.isString( keys ) ? keys.split( /\s*,\s*/ ) : keys;

            keys = _.compact( keys );

            if ( keys.length === 0 ) return _.noop;

            return function() {

              _.each( keys, ( key ) => {

                let callback = _.get( that, key );

                if ( callback ) callback.apply( that, arguments );

              } );

            };

          },

          ( keys ) => _.isString( keys ) ? keys : keys.join( ',' ),

        );


        return this.callbacks( keys );

      },

      callback( methodPath, cacheKey, ...partials ) {

        let that = this;


        this.callback = _.memoize(

          ( methodPath, cacheKey, ...partials ) => {

            let execute;

            if ( _.isEmpty( partials ) ) {

              execute = ( callback, args ) => callback.apply( that, args );

            } else {

              execute = ( callback, args ) => callback.call( that, ...partials, ...args );

            }

            return function() {

              let callback = _.get( that, methodPath );

              if ( callback ) return execute( callback, arguments );

            };

          },

          ( methodPath, cacheKey ) => `${ methodPath }${ cacheKey === undefined ? '' : `(${ cacheKey })` }`,

        );


        return this.callback( methodPath, cacheKey, ...partials );

      },

    };

  } ),

} );
