gulp = require 'gulp'

$ = require( 'gulp-load-plugins' )()

build = require '../_actions/build'


require './clean'


gulp.task 'development-build', [ 'development-clean' ], ( callback )->

  build '../{sources,tests}/**/*.cjsx', {

    base: '../'

    dest: 'build-development'

    plumber: false

    sourcemaps: true

  }

  .on 'end', ->

    $.pipe [

      gulp.src [ '../package.json', '../{sources,tests}/**/*.js' ]

      gulp.dest 'build-development'

    ]

    .on 'end', callback

  ##

##
