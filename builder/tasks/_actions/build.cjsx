gulp = require 'gulp'

_ = require 'lodash'

$ = require( 'gulp-load-plugins' )()

path = require 'path'

pipe = require './pipe'


AUTO_DEPENDENCIES = [

  {
    variable: 'React'
    package: 'react'
  }
  {
    variable: 'ReactDOM'
    package: 'react-dom'
  }
  {
    variable: '_'
    package: 'lodash'
  }

]

_.each AUTO_DEPENDENCIES, ( dependency )->

  used = RegExp "\\b#{ dependency.variable }[\\.\\[]"

  dependency.isNeeded = ( content, path )->=

    return false if /^(\.\.|extend)/.test path

    return true if /spec\.[^\.]+$/.test path

    return used.test content


sourcesDirectoryPath = path.resolve '../sources'


build = ( src, options = {} )->=

  pipe [

    gulp.src src, base: options.base

    $.plumber errorHandler: options.plumber if options.plumber

    $.insert.transform ( content, file )->=

      filePath = path.relative sourcesDirectoryPath, file.path

      sourcesPath = path.relative path.dirname( file.path ), sourcesDirectoryPath

      _.each AUTO_DEPENDENCIES, ( dependency )->

        if dependency.isNeeded content, filePath

          content = "#{ dependency.variable } = requireDependency '#{ dependency.package }';" + content

      content = content.replace /requireSubject\(\)/g, 'require("./index")'

      content = content.replace /requireDependency\s'([^']+)'/g, "requireSource('dependencies')['$1']"

      content = content.replace /requireSource(\(|\s)'/g, "require$1'#{ sourcesPath }/"

      content = '"use strict";' + content

      content

    $.sourcemaps.init() if options.sourcemaps

    $.coffeeReactVoid bare: true

    $.sourcemaps.write() if options.sourcemaps

    gulp.dest options.dest

  ]


module.exports = build
