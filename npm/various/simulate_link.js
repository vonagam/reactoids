'use strict';

var simulateLink;

if (!window.$) {
  console.log('reactoids/various/simulate_link: $ is not defined in window, see http://jquery.com');
}

simulateLink = function(href, containter, decorateLink) {
  var $link, event;
  if (containter == null) {
    containter = 'body';
  }
  $link = $('<a></a>');
  $link.attr('href', href);
  if (decorateLink) {
    decorateLink($link);
  }
  $link.appendTo(containter);
  event = $.Event('click');
  $link.trigger(event);
  if (event.isDefaultPrevented()) {
    $link.remove();
  } else {
    location.href = href;
  }
};

module.exports = simulateLink;
