# dependencies

$ = requireDependency 'jquery' # jquery/jquery, http://jquery.com

window = requireDependency 'window' # location


simulateLink = ( href, containter = 'body', decorateLink )->

  $link = $ '<a>'

  $link.attr 'href', href

  $link.appendTo containter

  decorateLink $link if decorateLink


  event = $.Event 'click'

  $link.trigger event


  if event.isDefaultPrevented()

    $link.remove()

  else

    window.location.href = href

  ##

##


module.exports = simulateLink
