export default isEqualPickWith = function( value, other, keys, customizer ) {

  if ( value === other ) return true;

  if ( ! keys ) return true;

  return _.isEqualWith( _.pick( value, keys ), _.pick( other, keys ), customizer );

};
