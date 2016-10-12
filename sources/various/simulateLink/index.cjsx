# dependencies

$ = requireDependency 'jquery' # jquery/jquery, http://jquery.com

windowLocation = requireWindow 'location' # https://developer.mozilla.org/en-US/docs/Web/API/Location


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

    windowLocation.href = href

  ##

##


module.exports = simulateLink
