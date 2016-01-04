isEqualPick = ( _ )->=

  ( value, other, keys, customizer, thisArg )->=

    return true if value == other

    _.isEqual _.pick( value, keys ), _.pick( other, keys ), customizer, thisArg

  ##

##


module.exports = isEqualPick
