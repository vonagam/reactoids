export default prepend = function( array, values ) {

  Array.prototype.unshift.apply( array, values );

  return array;

};
