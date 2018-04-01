export default isEqualPick = function( value, other, keys ) {

  if ( value === other ) return true;

  if ( ! keys ) return true;

  return _.isEqual( _.pick( value, keys ), _.pick( other, keys ) );

};
