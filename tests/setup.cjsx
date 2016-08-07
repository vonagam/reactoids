# source-maps

require( 'source-map-support' ).install environment: 'node', handleUncaughtExceptions: false


# jsdom

if typeof window == 'undefined'

  global.window = require './window'

  global.document = window.document

  global.navigator = window.navigator

##


# chai

chai = require 'chai'

global.expect = chai.expect

global.sinon = require 'sinon'


chai.use require 'sinon-chai'

chai.use require 'chai-changes'

chai.use require( 'chai-enzyme' )()

chai.use require './chai/onlyIf'


# extends

require '../sources/extends'

require '../sources/extends/lodash'


# helpers

require './react/enzyme'

global.itVariations = require './variations/runVariations'

global.createMixinClass = require './react/createMixinClass'


# globals

global.React = require 'react'

global.ReactDOM = require 'react-dom'

global._ = require 'lodash'
