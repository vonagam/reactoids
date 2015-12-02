falseyKeys = ( _ )->=

  ( object )->=

    _.keys _.omit object, _.identity


module.exports = falseyKeys
