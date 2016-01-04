gulp = require 'gulp'

$ = require( 'gulp-load-plugins' )()

build = require '../_actions/build'


require './clean'


gulp.task 'production-build', [ 'production-clean' ], ( callback )->

  build '../sources/**/*.cjsx',

    base: '../sources'

    dest: 'build-production'

    plumber: false

    sourcemaps: false

  ##

  .on 'end', ->

    $.pipe [

      gulp.src [ '../package.json', '../sources/**/*.js' ]

      gulp.dest 'build-production'

    ]

    .on 'end', callback

  ##

##
