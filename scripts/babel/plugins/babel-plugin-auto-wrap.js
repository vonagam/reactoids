'use strict';

const _ = require( 'lodash' );


module.exports = function( { types: t } ) {

  return {

    visitor: {

      Program( path, state ) {

        let match = state.file.opts.filename.match( /reactoids\/packages\/(?:[^\/]+)\/sources\/(.+)\/(test|story)\.js$/ );

        if ( ! match ) return;

        let dirname = match[ 1 ];

        let type = match[ 2 ];

        if ( type === 'story' ) {

          let stories = t.variableDeclaration( 'const', [

            t.VariableDeclarator( t.Identifier( 'stories' ), t.CallExpression( t.Identifier( 'StoriesOf' ), [

              t.StringLiteral( dirname.replace( /\//g, ':' ) ),

              t.Identifier( 'module' ),

            ] ) ),

          ] );

          path.unshiftContainer( 'body', stories );

        }

        if ( type === 'test' ) {

          let [ imports, code ] = _.partition( path.node.body, ( node ) => t.isImportDeclaration( node ) );

          path.node.body = [

            ...imports,

            t.ExpressionStatement( t.CallExpression( t.Identifier( 'describe' ), [

              t.StringLiteral( dirname.replace( /\//g, ':' ) ),

              t.ArrowFunctionExpression( [], t.BlockStatement( code ) ),

            ] ) ),

          ];

        }

      },

    },

  };

};
