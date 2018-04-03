'use strict';

const _ = require( 'lodash' );

const Path = require( 'path' );

const glob = require( 'glob' );


module.exports = _.compact( _.map( glob.sync( './sources/**/*/' ), ( path ) => {

  let directory = Path.basename( path );

  let relativePath = path.replace( './sources', '~' );

  let match;

  match = directory.match( /^component\.(?:.+\.)?(\w+)$/ );

  if ( match ) return { name: `${ match[ 1 ] }`, source: relativePath };

  match = directory.match( /^mixin\.(?:.+\.)?(\w+)$/ );

  if ( match ) return { name: `${ match[ 1 ] }Mixin`, source: relativePath };

  match = directory.match( /^various\.(?:.+\.)?(\w+)$/ );

  if ( match ) return { name: `${ match[ 1 ] }`, source: relativePath };

} ) );
