backgroundImage = ( url )->=

  if url

    backgroundImage: "url(#{ url })"

  else

    undefined

  ##

##


module.exports = backgroundImage
