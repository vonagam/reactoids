'use strict';


module.exports = function( { types: t } ) {

  return {

    visitor: {

      CallExpression( path ) {

        if ( path.node.callee.name !== 'assert' ) return;

        if ( path.scope.hasBinding( path.node.callee.name ) ) return;

        if ( ! path.parentPath.isExpressionStatement() ) return;


        let check = path.get( 'arguments.0' );

        let message = path.get( 'arguments.1' );

        let body;


        if ( message ) {

          if ( check.isFunctionExpression() || check.isArrowFunctionExpression() ) {

            check.replaceWith( t.CallExpression( path.get( 'arguments.0' ).node, [] ) );

          }

          body = t.IfStatement(

            t.BinaryExpression(

              '!==',

              check.node,

              t.BooleanLiteral( true ),

            ),

            t.ThrowStatement( t.NewExpression( t.Identifier( 'Error' ), [ message.node ] ) ),

          );

        } else {

          if ( check.isFunctionExpression() || check.isArrowFunctionExpression() ) {

            body = check.node.body;

          } else {

            body = t.ExpressionStatement( check.node );

          }

        }


        path.parentPath.replaceWith(

          t.IfStatement(

            t.BinaryExpression(

              '!==',

              t.MemberExpression( t.MemberExpression( t.Identifier( 'process' ), t.Identifier( 'env' ) ), t.Identifier( 'NODE_ENV' ) ),

              t.StringLiteral( 'production' ),

            ),

            body,

          ),

        );

      },

    },

  };

};
