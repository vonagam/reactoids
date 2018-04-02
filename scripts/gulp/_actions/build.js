'use strict';

const gulp = require( 'gulp' );

const $ = require( 'gulp-load-plugins' )();

const pipe = require( './pipe' );


module.exports = function build( src, options = {} ) {

  return pipe( [

    gulp.src( src, { base: options.base } ),

    options.plumber && $.plumber( { errorHandler: options.plumber } ),

    options.sourcemaps && $.sourcemaps.init(),

    $.babel( require( '../../babel/.babelrc.js' ) ),

    options.sourcemaps && $.sourcemaps.write(),

    gulp.dest( options.dest ),

  ] );

};
