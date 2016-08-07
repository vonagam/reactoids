gulp = require 'gulp'

clean = require '../_actions/clean'

build = require '../_actions/build'

test = require '../_actions/test'

path = require 'path'


require './build'


gulp.task 'development-watch', [ 'development-build' ], ->=

  gulp.watch '../{sources,tests}/**/*', ( event )->

    relativePath = path.relative './', event.path

    developmentPath = relativePath.replace( /^\.\./, 'build-development' ).replace /\.\w+$/, '.js'

    specPath = developmentPath.replace /(\w+)\.js$/, 'spec.js'


    switch event.type

      when 'changed', 'renamed'

        build relativePath, {

          base: '../'

          dest: 'build-development'

          plumber: ( error )->

            console.log error.toString()

            this.destroy error

          ##

          sourcemaps: true

        }

        .on 'end', ->

          test specPath, plumber: true

        ##

      when 'deleted'

        clean developmentPath

      ##

    ##

  ##

##
