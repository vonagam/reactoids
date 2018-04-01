export default toFlattenedPlainObject = function( source, predicate = _.isPlainObject, accumulator = {}, path = '' ) {

  return _.transform( source, ( accumulator, value, key ) => {

    if ( path ) key = `${ path }.${ key }`;

    if ( predicate( value ) ) {

      toFlattenedPlainObject( value, predicate, accumulator, key );

    } else {

      accumulator[ key ] = value;

    }

  }, accumulator );

};
