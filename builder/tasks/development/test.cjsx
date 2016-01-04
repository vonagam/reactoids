gulp = require 'gulp'

test = require '../_actions/test'


require './build'


gulp.task 'development-test', [ 'development-build' ], ->=

  test 'build-development/sources/**/spec.js', plumber: false

##
