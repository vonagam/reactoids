backgroundImage = ( url )->

  return unless url

  backgroundImage: "url(#{ url })"


$define -> backgroundImage
