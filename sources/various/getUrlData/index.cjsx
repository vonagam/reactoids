URI = require 'urijs'


PARTS = [ 'href', 'protocol', 'host', 'hostname', 'port', 'pathname', 'search', 'hash' ]


getUrlData = ( url )->=

  data = new URI url, window.location.href

  protocol = data.protocol()

  if protocol && ! /:$/.test protocol

    data.protocol = _.constant "#{ protocol }:"

  _.transform PARTS, ( result, part )->

    result[ part ] = data[ part ]()

  , {}


module.exports = getUrlData
