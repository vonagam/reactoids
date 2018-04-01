'use strict';


module.exports = function( { types: t } ) {

  return {

    visitor: {

      ExportDefaultDeclaration( path ) {

        let assigment = path.node.declaration;

        if ( ! t.isAssignmentExpression( assigment ) ) return;


        let variable = assigment.left;

        if ( ! t.isIdentifier( variable ) ) return;


        let name = variable.name;

        if ( path.scope.hasBinding( name ) ) return;


        let parent = path.parentPath;

        let key = path.inList ? `${ path.listKey }.${ path.key }` : path.key;

        path.replaceWithMultiple( [

          t.variableDeclaration( 'const', [ t.variableDeclarator( variable, assigment.right ) ] ),

          t.exportDefaultDeclaration( variable ),

        ] );

        path.scope.registerDeclaration( parent.get( key ) );

      },

    },

  };

};
