only = ( chai, utils )->

  Assertion = chai.Assertion


  Assertion.addMethod 'onlyIf', ( bool )->

    utils.flag this, 'negate', ! bool

  ##

##


module.exports = only
