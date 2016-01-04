count = ( _ )->=

  ( collection, target )->=

    _.reduce collection, ( count, value )->=

      count + ( value == target )

    , 0

  ##

##


module.exports = count
