'use strict';

const gulp = require( 'gulp' );


gulp.task( 'all:build', [ 'lib:build', 'dist:build' ] );
