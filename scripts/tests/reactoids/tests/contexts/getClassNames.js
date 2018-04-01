export default getClassNames = function( id, constructor, keys, instance ) {

  return _.transform( keys, ( classNames, key ) => {

    classNames[ key ] = (

      key == '.' ?

        _.snakeCase( constructor.displayName )

      :

        _.last( key.split( '.' ) )

    );

  }, {} );

};
