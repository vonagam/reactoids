export default isEqualOmit = function( value, other, keys ) {

  if ( value === other ) return true;

  if ( ! keys ) return _.isEqual( value, other );

  return _.isEqual( _.omit( value, keys ), _.omit( other, keys ) );

};
