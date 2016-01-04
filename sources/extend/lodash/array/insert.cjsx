insert = ( _ )->=

  ( array, index, values )->=

    Array.prototype.splice.apply array, [ index, 0 ].concat values

    array

  ##

##


module.exports = insert
