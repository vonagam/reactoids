'use strict';

const _ = require( 'lodash' );

const Path = require( 'path' );

const glob = require( 'glob' );


const methods = _.map(

  glob.sync( process.env.REACTOIDS_REACTOIDS + '/sources/extend.lodash/*/*.js' ),

  ( path ) => {

    let folder = Path.basename( path.replace( Path.basename( path ), '' ) );

    let method = Path.basename( path, '.js' );

    return { folder, method };

  },

);

const prefix = process.env.REACTOIDS_REACTOIDS === process.env.REACTOIDS_PACKAGE ? '..' : '@reactoids/reactoids';

const autos = _.map( methods, ( { folder, method } ) => ( {

  name: `_.${ method }`,

  source: `${ prefix }/extend.lodash/${ folder }/${ method }`,

} ) );


module.exports = autos;
