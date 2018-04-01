export default CallbackMixin = Mixin.create( {

  name: 'CallbackMixin',

  mixin: _.once( () => {

    return {

      callback( keys ) {

        let that = this;


        this.callback = _.memoize(

          ( keys ) => {

            keys = _.isString( keys ) ? keys.split( /\s*,\s*/ ) : keys;

            keys = _.compact( keys );

            if ( keys.length === 0 ) return _.noop;

            return function() {

              _.each( keys, ( key ) => {

                _.get( that, key, _.noop ).apply( that, arguments );

              } );

            };

          },

          ( keys ) => _.isString( keys ) ? keys : keys.join( ',' ),

        );


        return this.callback( keys );

      },

    };

  } ),

} );
