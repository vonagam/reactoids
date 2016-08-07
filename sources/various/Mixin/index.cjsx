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


Mixin =

  createPlain: ( input )->=

    result = _.clone input

    handleWillMounts result

    result

  ##

  createArged: ( input )->=

    result = ( ARGS )->=

      ARGS = _.defaults {}, ARGS, input.defaults

      if process.env.NODE_ENV != 'production'

        _.each input.args, ( check, key )->

          check = check.isRequired unless _.has input.defaults, key

          error = check ARGS, key, 'arged Mixin constructor'

          throw error if error

        ##

      ##

      Mixin.createPlain input.mixin ARGS

    ##

    _.assign result, input

    result.picked = _.keys input.args

    _.each input.mixins, ( mixin )->

      result.picked = _.union result.picked, mixin.picked if _.isFunction mixin

    ##

    result.pick = ( ARGS )->=

      _.pick ARGS, result.picked

    ##

    result

  ##

  resolve: ( inputMixins )->=

    outputMixins = []

    addMixins = ( mixins )->

      _.each mixins, ( mixin )->

        return if _.includes outputMixins, mixin

        addMixins mixin.mixins

        outputMixins.push mixin

      ##

    ##

    addMixins inputMixins

    outputMixins = _.map outputMixins, ( mixin )->= _.omit mixin, 'mixins'

    outputMixins

  ##

##


module.exports = Mixin
