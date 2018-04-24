'use strict';

const Path = require( 'path' );


module.exports = function( { types: t } ) {

  return {

    visitor: {

      Program: {

        exit( path, state ) {

          let match = state.file.opts.filename.match( /reactoids\/packages\/(?:\w+)\/sources(\/.+)\.js$/ );

          if ( ! match ) return;

          let fromPath = Path.dirname( match[ 1 ] );

          path.traverse( {

            ImportDeclaration( path ) {

              let source = path.get( 'source' );

              if ( ! source.isStringLiteral() ) return;

              let match = source.node.value.match( /^~(\/.+)$/ );

              if ( ! match ) return;

              let toPath = match[ 1 ];

              let relativePath = Path.relative( fromPath, toPath );

              if ( relativePath[ 0 ] !== '.' ) relativePath = `./${ relativePath }`;

              source.replaceWith( t.StringLiteral( relativePath ) );

            },

          } );

        },

      },

    },

  };

};
