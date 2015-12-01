gulp = require 'gulp'

$ = require( 'gulp-load-plugins' )()

$.replace = require 'hn-gulp-replace'

path = require 'path'

pipe = require './pipe'


build = ( src, options = {} )->=

  pipe [

    gulp.src src, base: options.base

    $.plumber errorHandler: options.plumber if options.plumber

    $.replace 'requireSubject()', 'require("./index")'

    $.replace 'requireSource \'', ( match, file )->=

      fileDirectoryPath = path.dirname file.path

      sourcesDirectoryPath = path.resolve '../sources'

      relativePath = path.relative fileDirectoryPath, sourcesDirectoryPath

      "require '#{ relativePath }/"

    $.insert.prepend '"use strict";'

    $.sourcemaps.init() if options.sourcemaps

    $.coffeeReactVoid bare: true

    $.sourcemaps.write() if options.sourcemaps

    gulp.dest options.dest

  ]


module.exports = build
