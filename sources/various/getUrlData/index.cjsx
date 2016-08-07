# dependencies

window = requireDependency 'window' # location


PARTS = [ 'href', 'protocol', 'host', 'hostname', 'port', 'pathname', 'search', 'hash' ]


getUrlData = ( url )->=

  link = document.createElement 'a'

  link.href = url


  _.transform PARTS, ( result, part )->

    result[ part ] = link[ part ]

  , {}

##


module.exports = getUrlData
