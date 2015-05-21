$define ->


  simulateLink = ( href, containter = 'body', decorateLink )->

    $link = $ '<a></a>'

    $link.attr 'href', href

    decorateLink $link if decorateLink

    $link.appendTo containter

    event = $.Event 'click'

    $link.trigger event

    if ! event.isDefaultPrevented()

      location.href = href

    else

      $link.remove()

    return
