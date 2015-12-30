$ = requireDependency 'jquery'

Routes = requireDependency 'js-routes'


simulateLink = ( href, containter = 'body', decorateLink )->

  $link = $ '<a>'

  if Routes && /^[\w_]+$/.test( href ) && Routes[ href ]

    href = Routes[ href ]()

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
