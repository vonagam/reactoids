'use strict';

const gulp = require( 'gulp' );

const $ = require( 'gulp-load-plugins' )();

const pipe = require( './pipe' );


module.exports = function test( src, options = {} ) {

  return pipe( [

    gulp.src( src ),

    $.plumber( {

      errorHandler() {

        options.exit && process.exit( 1 );

      },

    } ),

    $.mocha( {

      ui: 'bdd-lazy-var/rspec',

      require: [ 'babel-core/register', process.env.REACTOIDS_SCRIPTS + '/tests/setup' ],

    } ),

  ] );

};
