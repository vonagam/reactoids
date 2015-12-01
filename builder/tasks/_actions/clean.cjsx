del = require 'del'


clean = ( src )->=

  del src


module.exports = clean
