export default getStrings = function( id, constructor, keys, instance ) {

  return _.transform( keys, ( strings, key ) => {

    strings[ key ] = `#${ key }`;

  }, {} );

};
