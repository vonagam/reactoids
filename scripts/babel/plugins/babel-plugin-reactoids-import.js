'use strict';


module.exports = function( { types: t } ) {

  if ( process.env.REACTOIDS_DIST !== 'true' ) return {};


  const traverser = {

    ImportDeclaration( path ) {

      let sourcePath = path.get( 'source' );

      if ( ! sourcePath.isStringLiteral() ) return;

      let sourceValue = sourcePath.node.value.replace( /^(@reactoids\/[^\/]+)\/sources/, '$1' );

      if ( sourceValue === sourcePath.node.value ) return;

      sourcePath.replaceWith( t.stringLiteral( sourceValue ) );

    },

  };


  return {

    visitor: {

      Program: {

        exit( path ) {

          path.traverse( traverser );

        },

      },

    },

  };

};
