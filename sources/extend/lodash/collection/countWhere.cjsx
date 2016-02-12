countWhere = ( _ )->=

  ( collection, source )->=

    matches = _.matches source

    _.reduce collection, ( count, value )->=

      count + ( matches value )

    , 0

  ##

##


module.exports = countWhere
