export default append = function( array, values ) {

  Array.prototype.push.apply( array, values );

  return array;

};
