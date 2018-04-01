'use strict';

const gulp = require( 'gulp' );

const clean = require( '../_actions/clean' );


gulp.task( 'dist:clean', () => {

  return clean( [ './builds/dist/**', '!./builds/dist' ] );

} );
