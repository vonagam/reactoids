'use strict';

const gulp = require( 'gulp' );

const test = require( '../_actions/test' );


require( './build' );


gulp.task( 'lib:test', () => {

  return test( './sources/**/test.js', { exit: true } );

} );
