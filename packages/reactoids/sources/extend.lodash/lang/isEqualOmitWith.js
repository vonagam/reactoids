export default isEqualOmitWith = function( value, other, keys, customizer ) {

  if ( value === other ) return true;

  if ( ! keys ) return _.isEqualWith( value, other, customizer );

  return _.isEqualWith( _.omit( value, keys ), _.omit( other, keys ), customizer );

};
