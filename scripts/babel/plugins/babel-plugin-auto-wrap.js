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


          let callee;

          let comments = path.parent.comments;

          let comment = _.find( comments, ( comment ) => /^\s*(only|skip)\s*$/.test( comment.value ) );

          if ( comment ) {

            callee = t.MemberExpression( t.Identifier( 'describe' ), t.Identifier( _.trim( comment.value ) ) );

          } else {

            callee = t.Identifier( 'describe' );

          }


          path.node.body = [

            ...imports,

            t.ExpressionStatement( t.CallExpression( callee, [

              t.StringLiteral( dirname.replace( /\//g, ':' ) ),

              t.ArrowFunctionExpression( [], t.BlockStatement( code ) ),

            ] ) ),

          ];

        }

      },

    },

  };

};
