'use strict';

const gulp = require( 'gulp' );

const clean = require( '../_actions/clean' );


gulp.task( 'lib:clean', () => {

  return clean( [ './builds/lib/**', '!./builds/lib' ] );

} );
