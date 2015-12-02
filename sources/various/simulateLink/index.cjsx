$ = requireDependency 'jquery'


simulateLink = ( href, containter = 'body', decorateLink )->

  $link = $ '<a>'

  $link.attr 'href', href

  decorateLink $link if decorateLink

  $link.appendTo containter

  event = $.Event 'click'

  $link.trigger event

  if event.isDefaultPrevented()

    $link.remove()

  else

    window.location.href = href


module.exports = simulateLink
