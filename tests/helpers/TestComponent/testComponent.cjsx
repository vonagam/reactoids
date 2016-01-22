_ = require 'lodash'

getVariations = require './variations/getVariations'
findReasons = require './variations/findReasons'

runShallowTest = require './runs/runShallowTest'
runRenderTest = require './runs/runRenderTest'


testComponent = ( Component, values, options, tests )->

  if arguments.length == 3

    tests = options

    options = {}

  ##

  variations = getVariations values

  _.each tests, ( test, name )->

    it name, ->

      problems = []

      if name == 'shallow'

        runTest = runShallowTest

      else

        runTest = runRenderTest

      ##

      test = { it: test } if _.isFunction test

      test.before() if test.before

      variations = _.filter variations, ( variation )->=

        return false if test.skip && test.skip variation

        return false if test.only && ! test.only variation

        return true

      ##

      this.timeout 2000 + variations.length * 3

      _.each variations, ( variation )->

        test.beforeEach variation if test.beforeEach

        try

          runTest Component, variation, options, _.partial test.it, variation

        catch error

          problem = _.find problems, ( problem )->= _.isEqual problem.error.stack, error.stack

          if problem

            problem.variations.push variation

          else

            problem = { error: error, variations: [ variation ] }

            problems.push problem

          ##

        finally

          test.afterEach variation if test.afterEach

        ##

      ##

      test.after() if test.after

      if problems.length > 0

        problem = problems[ 0 ]

        error = problem.error

        reasons = findReasons variations, problem.variations

        error.message = "#{ reasons }: #{ error.message }"

        throw error

      ##

    ##

  ##

##


module.exports = testComponent
