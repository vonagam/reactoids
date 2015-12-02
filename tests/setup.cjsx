# source-maps

require( 'source-map-support' ).install environment: 'node', handleUncaughtExceptions: false


# chai

chai = require 'chai'

GLOBAL.expect = chai.expect
GLOBAL.sinon = require 'sinon'

chai.use require 'sinon-chai'
chai.use require 'chai-changes'
chai.use require './helpers/myChai'


# helpers

GLOBAL.TestReact = require './helpers/TestReact'
GLOBAL.TestMixin = require './helpers/TestMixin'
GLOBAL.TestComponent = require './helpers/TestComponent'


# jsdom

jsdom = require 'jsdom'

GLOBAL.document = jsdom.jsdom '<!doctype html><html><body></body></html>'
GLOBAL.window = document.defaultView
GLOBAL.navigator = window.navigator # for ReactDOM


# dependencies

dependencies = require '../sources/dependencies'

dependencies[ 'lodash' ] = require 'lodash'
dependencies[ 'jquery' ] = require 'jquery'
dependencies[ 'react' ] = require 'react'
dependencies[ 'react-dom' ] = require 'react-dom'

require( '../sources/extend/lodash' )( dependencies[ 'lodash' ] )
require( '../sources/extend/react' )( dependencies[ 'react' ] )
