clamp = ( _ )->=

  ( value, min, max )->=

    return min if value < min
    return max if value > max
    return value

  ##

##


module.exports = clamp
