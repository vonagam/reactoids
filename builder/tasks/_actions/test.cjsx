gulp = require 'gulp'

$ = require( 'gulp-load-plugins' )()

pipe = require './pipe'


test = ( src, options = {} )->=

  pipe [

    gulp.src src

    $.plumber errorHandler: options.plumber if options.plumber

    $.mocha reporter: 'min', require: [ './build-development/tests/setup' ]

  ]


module.exports = test
