whenPromised = ( expectations, action )->=

  resolve = undefined

  promise = new Promise ( _resolve )-> resolve = _resolve

  promised = _.constant promise


  _.each expectations, ( expectation )->

    expectation.when promised if expectation

  ##

  action()

  resolve()


  promise

##


module.exports = whenPromised
