'use strict';

const gulp = require( 'gulp' );

const $ = require( 'gulp-load-plugins' )();

const test = require( '../_actions/test' );


require( './build' );


gulp.task( 'lib:watch', () => {

  return gulp.watch( [

    process.env.REACTOIDS_SCRIPTS + '/tests/**/*.js',

    './sources/**/*.js',

    '!./sources/**/story.js',

  ], ( event ) => {

    let eventPath = event.path;


    let testPath;

    if ( eventPath.indexOf( process.env.REACTOIDS_SCRIPTS ) > -1 ) {

      testPath = './sources/**/test.js';

    } else {

      if ( event.type === 'changed' || event.type === 'renamed' ) {

        testPath = eventPath.replace( /(\w+)\.js$/, 'test.js' )

      }

    }


    if ( testPath ) {

      test( testPath );

    }

  } );

} );
