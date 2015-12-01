gulp = require 'gulp'

build = require '../_actions/build'


require './clean'


gulp.task 'development-build', [ 'development-clean' ], ->=

  build '../{sources,tests}/**/*', 

    base: '../'

    dest: 'build-development'

    plumber: false

    sourcemaps: true
