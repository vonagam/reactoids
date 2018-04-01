'use strict';

const gulp = require( 'gulp' );


gulp.task( 'all:clean', [ 'lib:clean', 'dist:clean' ] );
