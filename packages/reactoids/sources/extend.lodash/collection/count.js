export default count = function( collection, target ) {

  return _.reduce( collection, ( count, value ) => {

    return count + ( value === target );

  }, 0 );

};
