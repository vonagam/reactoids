export default insert = function( array, index, values ) {

  Array.prototype.splice.apply( array, [ index, 0 ].concat( values ) );

  return array;

};
