gulp = require 'gulp'

clean = require '../_actions/clean'


gulp.task 'development-clean', ->=

  clean 'build-development/**/*'

##
