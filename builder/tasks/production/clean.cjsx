gulp = require 'gulp'

clean = require '../_actions/clean'


gulp.task 'production-clean', ->=

  clean 'build-production/**/*'
