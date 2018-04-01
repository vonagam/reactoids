export default oneOrArrayOf = function( propType ) { //TODO: test this method

  return PropTypes.oneOfType( [ propType, PropTypes.arrayOf( propType ) ] );

};
