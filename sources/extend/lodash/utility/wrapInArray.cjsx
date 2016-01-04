wrapInArray = ( _ )->=

  ( value )->=

    if _.isArray value then value else [ value ]

  ##

##


module.exports = wrapInArray
