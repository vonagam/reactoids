getUrlLocation = ( url )->

  link = document.createElement 'a'
  
  link.href = url

  link


module.exports = getUrlLocation
