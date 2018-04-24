'use strict';

const _ = require( 'lodash' );

const Path = require( 'path' );

const glob = require( 'glob' );


module.exports = function( { types: t } ) {

  const getTraverser = _.memoize( ( packagePath, commonAutos ) => {

    let packageAutos = _.compact( _.map( glob.sync( './sources/**/*/index.js', { cwd: packagePath } ), ( path ) => {

      let directory = Path.basename( Path.dirname( path ) );

      let rootPath = '~' + path.match( /^\.\/sources(\/.+)\/index\.js/ )[ 1 ];

      let match;

      match = directory.match( /^component\.(?:.+\.)?(\w+)$/ );

      if ( match ) return { name: `${ match[ 1 ] }`, source: rootPath };

      match = directory.match( /^mixin\.(?:.+\.)?(\w+)$/ );

      if ( match ) return { name: `${ match[ 1 ] }Mixin`, source: rootPath };

      match = directory.match( /^various\.(?:.+\.)?(\w+)$/ );

      if ( match ) return { name: `${ match[ 1 ] }`, source: rootPath };

    } ) );


    let customAutos;

    try {

      customAutos = require( packagePath + '/config.js' ).autos;

    } catch ( error ) {

      customAutos = [];

    }


    let autos = packageAutos.concat( customAutos, commonAutos );


    let lookup = {};

    _.each( autos, ( { name, source, member, namespace } ) => {

      let auto = {};


      if ( _.includes( name, '.' ) ) {

        let [ objectName, propertyName ] = name.split( '.' );

        lookup[ objectName ] = lookup[ objectName ] || [];

        lookup[ objectName ].push( auto );

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

        lookup[ name ] = lookup[ name ] || [];

        lookup[ name ].push( auto );

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

    } );


    let traverser = {

      Identifier( path ) {

        let autos = lookup[ path.node.name ];

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


    return traverser;

  } );


  const getPackagePath = function( filePath ) {

    let relativeFilePath = filePath.replace( process.env.REACTOIDS_BASE, '' );

    let match;

    match = relativeFilePath.match( /(\/packages\/\w+)\/sources\/.+/ );

    if ( match ) return process.env.REACTOIDS_BASE + match[ 1 ];

    match = relativeFilePath.match( /(\/scripts)\/tests\/.+/ );

    if ( match ) return process.env.REACTOIDS_BASE + match[ 1 ];

  };


  return {

    visitor: {

      Program: {

        exit( path, state ) {

          let packagePath = getPackagePath( state.file.opts.filename );

          if ( ! packagePath ) return;

          let traverser = getTraverser( packagePath, state.opts.autos );

          path.traverse( traverser );

        },

      },

    },

  };

};
