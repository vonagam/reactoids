prepend = ( array, values )->=

  Array.prototype.unshift.apply array, values

  array

##


module.exports = prepend
