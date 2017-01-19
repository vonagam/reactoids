ReactPropTypesSecret = require 'react/lib/ReactPropTypesSecret'


collectMixins = ( result, mixins )->

  _.each mixins, ( mixin )->

    return unless mixin

    return if _.includes result, mixin

    collectMixins result, mixin.mixins

    result.push mixin

  ##

##


handleWillMounts = ( input )->

  willMounts = []

  if input.initConstants

    willMounts.push _.once input.initConstants

    delete input.initConstants

  ##

  if input.getInitialMembers

    getMembers = input.getInitialMembers

    willMounts.push ->

      _.merge this, getMembers.apply this

    ##

    delete input.getInitialMembers

  ##

  if input.componentWillMount

    willMounts.push input.componentWillMount

    delete input.componentWillMount

  ##

  switch willMounts.length

    when 0 then return

    when 1 then input.componentWillMount = willMounts[ 0 ]

    else input.componentWillMount = _.queue.apply _, willMounts

  ##

##

addOptions = ( mixin, options )->

  _.assign mixin, options

##

addPick = ( mixin )->

  mixins = [ mixin ]

  collectMixins mixins, mixin.mixins

  keys = _.uniq _.flatMap mixins, ( mixin )->= _.keys mixin.args


  mixin.pick = ( ARGS )->=

    _.pick ARGS, keys

  ##

##


Mixin = {

  create: ( options )->=

    options = _.defaults {}, options, {

      name: 'SomeUnknownMixin'

      args: {}

      defaults: {}

      mixins: []

    }


    mixin = ( ARGS )->=

      ARGS = _.defaults {}, ARGS, options.defaults

      if process.env.NODE_ENV != 'production'

        _.each options.args, ( check, key )->

          check = check.isRequired unless _.has options.defaults, key

          error = check ARGS, key, options.name, 'reactoids_mixin', null, ReactPropTypesSecret

          throw error if error

        ##

      ##

      result = options.mixin ARGS

      handleWillMounts result

      result

    ##


    addOptions mixin, options

    addPick mixin


    mixin

  ##

  resolve: ( inputMixins )->=

    outputMixins = []

    collectMixins outputMixins, inputMixins

    outputMixins = _.map outputMixins, ( mixin )->= _.omit mixin, 'mixins'

    outputMixins

  ##

}


module.exports = Mixin
