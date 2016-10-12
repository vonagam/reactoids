gulp = require 'gulp'

$ = require( 'gulp-load-plugins' )()

path = require 'path'

pipe = require './pipe'


addAutoRequires = require './build/addAutoRequires'


sourcesDirectoryPath = path.resolve '../sources'


build = ( src, options = {} )->=

  pipe [

    gulp.src src, base: options.base

    $.plumber errorHandler: options.plumber if options.plumber

    $.rename ( path )->=

      path.dirname = path.dirname.replace /lodash\/\w+$/, 'lodash'

      path

    ##

    $.insert.transform ( content, file )->=

      filePath = path.relative sourcesDirectoryPath, file.path

      sourcesPath = path.relative path.dirname( file.path ), sourcesDirectoryPath

      content = addAutoRequires content, filePath

      content = content.replace /requireWindow\(? '([^']+)'( \))?/g, 'window.$1'

      content = content.replace /requireSubject\(\)/g, 'require("./index")'

      content = content.replace /requireDependency(\(?) '/g, "require$1 '"

      content = content.replace /requireSource(\(?) '/g, "require$1 '#{ sourcesPath }/"

      content = '"use strict"\n\n' + content

      content

    ##

    $.sourcemaps.init() if options.sourcemaps

    $.coffeeReactVoid bare: true

    $.sourcemaps.write() if options.sourcemaps

    gulp.dest options.dest

  ]

##


module.exports = build
