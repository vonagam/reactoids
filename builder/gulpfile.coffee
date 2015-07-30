'use strict'


gulp = require 'gulp'

$ = require( 'gulp-load-plugins' )()

$.replace = require 'hn-gulp-replace'

del = require 'del'

_ = require 'lodash'


gulp.task 'clean-npm', ( callback )->

  del [ '../npm/**/*', '!../npm/package.json' ], force: true, callback


gulp.task 'npm', [ 'clean-npm' ], ->

  $.pipe [

    gulp.src '../README.md'

    gulp.dest '../npm'

  ]

  $.pipe [ 

    gulp.src '../src/**/*'

    gulp.dest '../npm/src'

  ]

  $.pipe [

    gulp.src '../src/**/*'

    $.replace '§export', 'module.exports ='

    $.replace /§global '(.+)', '(.+)'/, ( match, p1, p2, offset, string, file )->

      path = file.path
        .replace /^.+src\//, ''
        .replace /\..+$/, ''

      "console.log 'reactoids/#{ path }: #{ p1 } is not defined in window, see #{ p2 }' if ! window.#{ p1 }"

    $.replace "§require '", ( match, file )->

      path = file.path.replace /^.+src\//, ''

      level = ( path.match( /\//g ) || [] ).length

      to_root = _.repeat( '../', level ) || './'

      "require '#{ to_root }"

    $.cjsx bare: true

    $.insert.prepend "'use strict';\n\n"

    gulp.dest '../npm'

  ]

  .on 'error', ( error )-> $.util.log error


gulp.task 'default', [ 'npm' ]
