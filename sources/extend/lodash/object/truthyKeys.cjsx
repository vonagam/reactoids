truthyKeys = ( _ )->=

  ( object )->=

    _.keys _.pick object, _.identity

  ##

##


module.exports = truthyKeys
