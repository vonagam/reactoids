path = require 'path'

getStack = require './getStack'


requireSubject = ->=

  stack = getStack()

  thisFile = stack[ 0 ].file

  testFile = stack[ 1 ].file

  require path.resolve testFile, '../index'

  ###

  currentDir = path.dirname thisFile

  projectDir = path.resolve currentDir, '../..'

  fromProjectToTestFile = path.relative projectDir, testFile

  fromProjectToSourceFile = fromProjectToTestFile.replace 'tests', 'sources'

  sourceFile = path.resolve projectDir, fromProjectToSourceFile

  sourceFile = sourceFile.replace new RegExp( "#{ path.extname sourceFile }$" ), ''

  require sourceFile

  ###


module.exports = requireSubject
