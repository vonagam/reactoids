_ = require 'lodash'


getVariations = require './getVariations'

findReasons = require './findReasons'


runVariations = ( name, values, options, block )->

  if arguments.length == 3

    block = options

    options = {}

  ##


  it name, ->

    problems = []


    variations = getVariations values

    variations = _.filter variations, ( variation )->=

      return false if options.skip && options.skip variation

      return false if options.only && ! options.only variation

      return true

    ##


    this.timeout 2000 + variations.length * 3


    options.before() if options.before

    _.each variations, ( variation )->

      options.beforeEach variation if options.beforeEach

      try

        block.call null, variation

      catch error

        problem = _.find problems, ( problem )->= _.isEqual problem.error.stack, error.stack

        if problem

          problem.variations.push variation

        else

          problem = { error: error, variations: [ variation ] }

          problems.push problem

        ##

      finally

        options.afterEach variation if options.afterEach

      ##

    ##

    options.after() if options.after


    if problems.length > 0

      problem = problems[ 0 ]

      error = problem.error

      reasons = findReasons variations, problem.variations

      error.message = "#{ reasons }: #{ error.message }"

      throw error

    ##

  ##

##


module.exports = runVariations
