append = ( array, values )->=

  Array.prototype.push.apply array, values

  array

##


module.exports = append
