'use strict';

const gulp = require( 'gulp' );

const $ = require( 'gulp-load-plugins' )();

const build = require( '../_actions/build' );


require( './clean' );


gulp.task( 'lib:build', [ 'lib:clean' ], ( callback ) => {

  build( [

    process.env.REACTOIDS_SCRIPTS + '/@(tests)/**/*.js',

    './@(sources)/**/*.js',

  ], {

    dest: 'builds/lib',

    plumber: false,

    prettier: false,

    sourcemaps: true,

  } )

  .on( 'end', () => {

    $.pipe( [

      gulp.src( './@(sources)/**/*.md' ),

      gulp.dest( 'builds/lib' ),

    ] )

    .on( 'end', callback );

  } );

} );
