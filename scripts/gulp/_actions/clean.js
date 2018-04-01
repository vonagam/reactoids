'use strict';

const del = require( 'del' );


module.exports = function clean( src ) {

  return del( src );

};
