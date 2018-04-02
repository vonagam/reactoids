'use strict';

const _ = require( 'lodash' );


module.exports = function( { types: t } ) {

  const STATIC = {

    lookup: {},

    autos: undefined,

    init( autos ) {

      if ( this.autos ) return;

      this.autos = _.map( autos, ( { name, source, member, namespace } ) => {

        let auto = {};


        if ( _.includes( name, '.' ) ) {

          let [ objectName, propertyName ] = name.split( '.' );

          this.lookup[ objectName ] = this.lookup[ objectName ] || [];

          this.lookup[ objectName ].push( auto );

          auto.matches = function( path ) {

            return (

              path.parentPath.isMemberExpression( { object: path.node, computed: false } ) &&

              path.parentPath.node.object.name === objectName &&

              path.parentPath.node.property.name == propertyName

            );

          };

          auto.replace = function( path ) {

            path = path.parentPath;

            let parent = path.parentPath;

            let key = path.inList ? `${ path.listKey }.${ path.key }` : path.key;

            path.replaceWith( t.identifier( name.replace( '.', '_' ) ) );

            return parent.get( key );

          };

        } else {

          this.lookup[ name ] = this.lookup[ name ] || [];

          this.lookup[ name ].push( auto );

          auto.matches = function( path ) {

            return path.node.name === name;

          };

          auto.replace = function( path ) {

            return path;

          };

        }


        if ( _.isString( member ) ) {

          auto.importSpecifier = function( identifier ) {

            return t.importSpecifier( identifier, t.Identifier( member ) );

          };

        } else if ( member ) {

          auto.importSpecifier = function( identifier ) {

            return t.importSpecifier( identifier, identifier );

          };

        } else if ( namespace ) {

          auto.importSpecifier = function( identifier ) {

            return t.importNamespaceSpecifier( identifier );

          };

        } else {

          auto.importSpecifier = function( identifier ) {

            return t.importDefaultSpecifier( identifier );

          };

        }


        auto.importDeclaration = function( identifier ) {

          let importSpecifier = auto.importSpecifier( identifier );

          return t.importDeclaration( [ importSpecifier ], t.StringLiteral( source ) );

        };


        return auto;

      } );

    },

  };


  const traverser = {

    Identifier( path ) {

      let autos = STATIC.lookup[ path.node.name ];

      if ( ! autos ) return;

      let auto = _.find( autos, ( auto ) => auto.matches( path ) );

      if ( ! auto ) return;

      path = auto.replace( path );

      if ( path.scope.hasBinding( path.node.name ) ) return;

      if ( path.parentPath.isMemberExpression( { property: path.node } ) ) return;

      if ( path.parentPath.isObjectProperty( { key: path.node, shorthand: false } ) ) return;

      let program = path.findParent( ( path ) => path.isProgram() );

      let importDeclaration = auto.importDeclaration( path.node );

      let paths = program.unshiftContainer( 'body', importDeclaration );

      program.scope.registerDeclaration( paths[ 0 ] );

      path.scope.getBinding( path.node.name ).path.scope.crawl();

    },

  };


  return {

    visitor: {

      Program: {

        exit( path, state ) {

          STATIC.init( state.opts.autos );

          path.traverse( traverser );

        },

      },

    },

  };

};
