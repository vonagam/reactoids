export default collectionOf = function( propType ) {

  return PropTypes.oneOfType( [ PropTypes.objectOf( propType ), PropTypes.arrayOf( propType ) ] );

};
