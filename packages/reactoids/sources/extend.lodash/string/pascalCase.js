export default pascalCase = function( string = '' ) {

  return _.upperFirst( _.camelCase( string ) );

};
