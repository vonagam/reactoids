$ = require( 'gulp-load-plugins' )()

_ = require 'lodash'


pipe = ( pipes )->= 

  $.pipe _.compact pipes

##


module.exports = pipe
