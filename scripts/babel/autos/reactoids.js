'use strict';

const _ = require( 'lodash' );

const Path = require( 'path' );

const glob = require( 'glob' );


module.exports = _.compact( _.map( glob.sync( './sources/**/*/index.js' ), ( path ) => {

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
