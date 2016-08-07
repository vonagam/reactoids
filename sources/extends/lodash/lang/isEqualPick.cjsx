isEqualPick = ( value, other, keys )->=

  return true if value == other

  _.isEqual _.pick( value, keys ), _.pick( other, keys )

##


module.exports = isEqualPick
