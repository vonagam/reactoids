isEqualPickWith = ( value, other, keys, customizer )->=

  return true if value == other

  _.isEqualWith _.pick( value, keys ), _.pick( other, keys ), customizer

##


module.exports = isEqualPickWith
