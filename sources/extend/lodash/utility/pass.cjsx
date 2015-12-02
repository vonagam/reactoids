pass = ( _ )->=

  ( func, args, thisArg )->=

    func.apply thisArg, args if func


module.exports = pass
