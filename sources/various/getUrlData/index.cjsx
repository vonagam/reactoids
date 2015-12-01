#if ! __ReactoidsOnServer

getUrlLink = (->=

  link = document.createElement 'a'

  ( url )->=
  
    link.href = url

    link

)()

###

else

  getUrlLink = (->=

    serverSide = requireSource 'serverSide'

    Url = require 'url'

    defaults = { 'protocol': '', 'host': '', 'hostname': '', 'port': '', 'pathname': '', 'search': '', 'hash': '' }

    ( url )->=

      url = Url.resolve serverSide.href, url

      link = Url.parse url

      link = _.defaults _.pick( link, _.isString ), defaults

      link

  )()

###


getUrlData = ( url )->=

  link = getUrlLink url

  _.pick link, [ 'href', 'protocol', 'host', 'hostname', 'port', 'pathname', 'search', 'hash' ]


module.exports = getUrlData
