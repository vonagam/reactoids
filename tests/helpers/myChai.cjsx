myChai = ( chai, utils )->

  Assertion = chai.Assertion

  Assertion.addMethod 'only', ( bool )->

    utils.flag this, 'negate', ! bool


module.exports = myChai
