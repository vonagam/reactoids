'use strict';

const _ = require( 'lodash' );

const Path = require( 'path' );

const glob = require( 'glob' );


const types = _.map(

  glob.sync( process.env.REACTOIDS_REACTOIDS + '/sources/extend.react/PropTypes/*.js' ),

  ( path ) => Path.basename( path, '.js' ),

);

const prefix = process.env.REACTOIDS_REACTOIDS === process.env.REACTOIDS_PACKAGE ? '..' : '@reactoids/reactoids';

const autos = _.map( types, ( type ) => ( {

  name: `PropTypes.${ type }`,

  source: `${ prefix }/extend.react/PropTypes/${ type }`,

} ) );


module.exports = autos;
