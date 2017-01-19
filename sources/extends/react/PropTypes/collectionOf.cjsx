PropTypes = React.PropTypes


PropTypes.collectionOf = ( propType )->=

  PropTypes.oneOfType [ PropTypes.objectOf( propType ), PropTypes.arrayOf( propType ) ]

##
