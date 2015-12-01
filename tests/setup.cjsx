# source-maps

require( 'source-map-support' ).install environment: 'node', handleUncaughtExceptions: false


# chai

chai = require 'chai'

GLOBAL.expect = chai.expect
GLOBAL.sinon = require 'sinon'

chai.use require 'sinon-chai'
chai.use require 'chai-changes'
chai.use require './helpers/myChai'


# jsdom

jsdom = require 'jsdom'

GLOBAL.document = jsdom.jsdom '<!doctype html><html><body></body></html>'
GLOBAL.window = document.defaultView
GLOBAL.navigator = window.navigator # for ReactDOM


# dependecies

GLOBAL._ = require 'lodash'
GLOBAL.$ = require 'jquery'
GLOBAL.React = require 'react'
GLOBAL.ReactDOM = require 'react-dom'

require( '../sources/extend/lodash' )( GLOBAL._ )
require( '../sources/extend/react' )( GLOBAL.React )


# helpers

###
GLOBAL.requireSubject = require './helpers/requireSubject'
###
GLOBAL.TestReact = require './helpers/TestReact'
GLOBAL.TestMixin = require './helpers/TestMixin'
GLOBAL.TestComponent = require './helpers/TestComponent'
