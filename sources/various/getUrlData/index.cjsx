LINK = document.createElement 'a'


getUrlData = ( url )->=

  LINK.href = url

  _.pick LINK, [ 'href', 'protocol', 'host', 'hostname', 'port', 'pathname', 'search', 'hash' ]


module.exports = getUrlData
