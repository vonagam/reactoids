'use strict';

const gulp = require( 'gulp' );

const $ = require( 'gulp-load-plugins' )();

const build = require( '../_actions/build' );


require( './clean' );


gulp.task( 'dist:build', [ 'dist:clean' ], () => {

  return build( [

    './sources/**/*.js',

    '!./sources/**/{test,story}.js',

  ], {

    dest: './builds/dist',

    plumber: false,

    prettier: true,

    sourcemaps: false,

  } );

} );
