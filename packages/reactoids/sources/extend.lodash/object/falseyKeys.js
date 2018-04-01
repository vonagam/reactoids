export default falseyKeys = function( object ) {

  return _.transform( object, ( keys, value, key ) => {

    if ( ! value ) {

      keys.push( key );

    }

  }, [] );

};
