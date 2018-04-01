'use strict';

const $ = require( 'gulp-load-plugins' )();

const _ = require( 'lodash' );


module.exports = function pipe( pipes ) {

  return $.pipe( _.compact( pipes ) );

};
