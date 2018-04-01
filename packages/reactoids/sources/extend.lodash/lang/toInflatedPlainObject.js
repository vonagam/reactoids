export default toInflatedPlainObject = function( source ) {

  return _.transform( source, ( accumulator, value, path ) => {

    _.set( accumulator, path, value );

  }, {} );

};
