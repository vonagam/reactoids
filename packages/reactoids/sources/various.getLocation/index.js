const PARTS = [ 'href', 'protocol', 'host', 'hostname', 'port', 'pathname', 'search', 'hash' ];


export default getLocation = function( url ) {

  assert( _.isNil( url ) || _.isString( url ) || _.isPlainObject( url ), 'getLocation: if present url must be a string or an object' );


  let link = document.createElement( 'a' );

  link.href = window.location.href;


  if ( _.isString( url ) ) {

    link.href = url;

  }

  if ( _.isPlainObject( url ) ) {

    _.assign( link, _.pick( url, PARTS ) );

  }


  return _.transform( PARTS, ( location, part ) => {

    Object.defineProperty( location, part, {

      enumerable: true,

      get() {

        return link[ part ];

      },

      set( value ) {

        link[ part ] = value;

      },

    } );

  }, {} );

};
